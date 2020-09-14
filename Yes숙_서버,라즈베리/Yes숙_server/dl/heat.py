from urllib.request import urlopen
from urllib.parse import urlencode, unquote, quote_plus
import urllib
import requests
import json
import pandas as pd
from bs4 import BeautifulSoup
from datetime import date, timedelta, datetime
import time
import sys

today = date.today()
now = datetime.now()

url = 'http://apis.data.go.kr/1360000/MidFcstInfoService/getMidTa'

x_now=int(str(now.hour)+str(now.minute)) #현재 시간+분/ 인트형

if x_now>=600 and x_now<1800:
    today_string = today.strftime('%Y%m%d') + '0600'
    Queryparams = '?' + 'serviceKey=' + '%2B6LwXwdSiXfBWg2A2q8IXzUCjGP13kzdct07M%2Bu6z9a%2BtwEhnndllUmg%2B9dzpW9ggINqxPfYck050bxzhUAPjw%3D%3D' \
                    + '&pageNo=' + '1' \
                    + '&numOfRows=' + '10'\
                    + '&dataType=' + 'XML' \
                    + '&regId=' + '11B20201' \
                    + '&tmFc=' + today_string
    #print('0600~1800')
else:
    today_string = today.strftime('%Y%m%d') + '1800'
    Queryparams = '?' + 'serviceKey=' + '%2B6LwXwdSiXfBWg2A2q8IXzUCjGP13kzdct07M%2Bu6z9a%2BtwEhnndllUmg%2B9dzpW9ggINqxPfYck050bxzhUAPjw%3D%3D' \
                  + '&pageNo=' + '1' \
                  + '&numOfRows=' + '10' \
                  + '&dataType=' + 'XML' \
                  + '&regId=' + '11B20201' \
                  + '&tmFc=' + today_string
    #print('1800~0600')


url = url + Queryparams
result = requests.get(url)

bs_obj = BeautifulSoup(result.text, "html.parser")

CommerceInfor = {}
Max_3list = []
Min_3list = []

Max3 = bs_obj.find_all('tamax3')
Min3 = bs_obj.find_all('tamin3')

for code in Max3:
    Max_3list.append(code.text)
for code in Min3:
    Min_3list.append(code.text)

CommerceInfor['3일뒤 최고기온'] = Max_3list
CommerceInfor['3일뒤 최저기온'] = Min_3list


df = pd.DataFrame(CommerceInfor)
df = df[['3일뒤 최고기온','3일뒤 최저기온']]

#print(df)
#print(bs_obj)


TM3 = int(Max_3list[0])
Tm3 = int(Min_3list[0])
W=''
maxT=''
minT=''
#print('<인천지역>')
if 33<= TM3 <35:
    #print('3일뒤 폭염주의보, 3일뒤 최고기온은: '+ str(TM3) + '도')
    W='heatwavewarning'
    maxT=str(TM3)
elif 35<= TM3:
    #print('3일뒤 폭염경보, 3일뒤 최고기온은: ' + str(TM3) + '도')
    W='heatwavewarningUp'
    minT=str(TM3)
elif -15< Tm3 <= -12:
    #print('3일뒤 한파주의보, 3일뒤 최저기온은: ' + str(Tm3) + '도')
    W='coldwavewarning'
    minT=str(Tm3)
elif Tm3 <= -15:
    #print('3일뒤 한파경보, 3일뒤 최저기온은: ' + str(Tm3) + '도')
    W='coldwavewarningUp'
    minT=str(Tm3)
else:
    #print('3일뒤 폭염특보X, 3일뒤 최고기온은: ' + str(TM3) + '도')
    #print('3일뒤 한파특보x, 3일뒤 최저기온은: ' + str(Tm3) + '도')
    W='nowarning'
    maxT=str(TM3)
    minT=str(Tm3)

#print(W)
json_object={
    'warning':W,
    'maxTemp':maxT,
    'minTemp':minT
}
json_string = json.dumps(json_object)
print(json_string)