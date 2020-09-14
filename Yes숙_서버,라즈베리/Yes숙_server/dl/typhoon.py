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
import xmltodict

url = 'http://apis.data.go.kr/1360000/TyphoonInfoService/getTyphoonInfo'

today = date.today()
now = datetime.now()
y=today.strftime('%Y%m%d') #오늘 년도월시간
#print(y)
Queryparams = '?' + 'serviceKey=' + '%2B6LwXwdSiXfBWg2A2q8IXzUCjGP13kzdct07M%2Bu6z9a%2BtwEhnndllUmg%2B9dzpW9ggINqxPfYck050bxzhUAPjw%3D%3D' \
                + '&pageNo=' + '1' \
                + '&numOfRows=' + '10'\
                + '&dataType=' + 'XML' \
                + '&fromTmFc=' + y \
                + '&toTmFc=' + y
url = url + Queryparams

content = requests.get(url).content
dict = xmltodict.parse(content)
jsonString2 = json.dumps(dict['response']['header'], ensure_ascii=False)
jsonObj2 = json.loads(jsonString2)

#dump() 와 dumps() 는 파이썬 타입을 JSON으로 변환하는 메소드
#JSON 형태의 문자열을 읽기 위해 loads()를 사용한다
typhoon=''
if jsonObj2['resultMsg']=='NO_DATA':
    typhoon ='notyphoon'
else:
    jsonString = json.dumps(dict['response']['body']['items']['item'], ensure_ascii=False)
    jsonObj = json.loads(jsonString)
    typhoon = jsonObj[0]['rem']
json_object={
    'typhoon':typhoon
    }
json_string = json.dumps(json_object)
print(json_string)

'''
typhoon=''
if rstlist[0]=='NO_DATA':
    #print("현재 태풍 X ")
    typhoon='notyphoon'

else:
    #print(bs_obj)
    typhoon=bs_obj
json_object={
    'typhoon':typhoon
}
json_string=json.dumps(json_object)
print(json_string)
'''