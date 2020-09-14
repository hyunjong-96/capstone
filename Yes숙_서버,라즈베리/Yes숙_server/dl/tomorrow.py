from operator import eq
from urllib.request import urlopen
from urllib.parse import urlencode, unquote, quote_plus
import urllib
import requests
import json
import pandas as pd
from bs4 import BeautifulSoup
from datetime import date, timedelta, datetime
import time
import xml.etree.ElementTree as etree
import xmltodict

'''
today = date.today()
now = datetime.now()
#-------------------------내일 강수확률 / 6시간 누적 강수량 -------------------------
url = 'http://apis.data.go.kr/1360000/VilageFcstInfoService/getVilageFcst'
z=now.minute
if(now.minute<10):
    z = str(0)+str(z)
print('현재(분): '+ str(z))
x_now=int(str(now.hour)+str(z)) #현재 시간+분/ 인트형
print('현재(시간 + 분): '+ str(x_now))
y=today.strftime('%Y%m%d')
print('현재(년도 + 날짜): '+ y)
t=date.today()+timedelta(1)
Tomorrow = t.strftime('%Y%m%d')
print('내일(년도 + 날짜): '+ Tomorrow)


if 2311<=x_now or x_now<=210:
    Queryparams = '?' + 'serviceKey=' + '%2B6LwXwdSiXfBWg2A2q8IXzUCjGP13kzdct07M%2Bu6z9a%2BtwEhnndllUmg%2B9dzpW9ggINqxPfYck050bxzhUAPjw%3D%3D' \
                    + '&pageNo=' + '1' \
                    + '&numOfRows=' + '150'\
                    + '&dataType=' + 'XML' \
                    + '&base_date=' + y \
                    + '&base_time=' + '2300' \
                    + '&nx=' + '56' \
                    + '&ny=' + '124'
    print('2300')
elif 211<=x_now and x_now<=510:
    Queryparams = '?' + 'serviceKey=' + '%2B6LwXwdSiXfBWg2A2q8IXzUCjGP13kzdct07M%2Bu6z9a%2BtwEhnndllUmg%2B9dzpW9ggINqxPfYck050bxzhUAPjw%3D%3D' \
                  + '&pageNo=' + '1' \
                  + '&numOfRows=' + '150' \
                  + '&dataType=' + 'XML' \
                  + '&base_date=' + y \
                  + '&base_time=' + '0200' \
                  + '&nx=' + '56' \
                  + '&ny=' + '124'
    print('0200')
elif 511<=x_now and x_now<=810:
    Queryparams = '?' + 'serviceKey=' + '%2B6LwXwdSiXfBWg2A2q8IXzUCjGP13kzdct07M%2Bu6z9a%2BtwEhnndllUmg%2B9dzpW9ggINqxPfYck050bxzhUAPjw%3D%3D' \
                  + '&pageNo=' + '1' \
                  + '&numOfRows=' + '150' \
                  + '&dataType=' + 'XML' \
                  + '&base_date=' + y \
                  + '&base_time=' + '0500' \
                  + '&nx=' + '56' \
                  + '&ny=' + '124'
    print('0500')
elif 811<=x_now and x_now<=1110:
    Queryparams = '?' + 'serviceKey=' + '%2B6LwXwdSiXfBWg2A2q8IXzUCjGP13kzdct07M%2Bu6z9a%2BtwEhnndllUmg%2B9dzpW9ggINqxPfYck050bxzhUAPjw%3D%3D' \
                  + '&pageNo=' + '1' \
                  + '&numOfRows=' + '150' \
                  + '&dataType=' + 'XML' \
                  + '&base_date=' + y \
                  + '&base_time=' + '0800' \
                  + '&nx=' + '56' \
                  + '&ny=' + '124'
    print('0800')
elif 1111<=x_now and x_now<=1410:
    Queryparams = '?' + 'serviceKey=' + '%2B6LwXwdSiXfBWg2A2q8IXzUCjGP13kzdct07M%2Bu6z9a%2BtwEhnndllUmg%2B9dzpW9ggINqxPfYck050bxzhUAPjw%3D%3D' \
                  + '&pageNo=' + '1' \
                  + '&numOfRows=' + '150' \
                  + '&dataType=' + 'XML' \
                  + '&base_date=' + y \
                  + '&base_time=' + '1100' \
                  + '&nx=' + '56' \
                  + '&ny=' + '124'
elif 1411<=x_now and x_now<=1710:
    Queryparams = '?' + 'serviceKey=' + '%2B6LwXwdSiXfBWg2A2q8IXzUCjGP13kzdct07M%2Bu6z9a%2BtwEhnndllUmg%2B9dzpW9ggINqxPfYck050bxzhUAPjw%3D%3D' \
                  + '&pageNo=' + '1' \
                  + '&numOfRows=' + '150' \
                  + '&dataType=' + 'XML' \
                  + '&base_date=' + y \
                  + '&base_time=' + '1400' \
                  + '&nx=' + '56' \
                  + '&ny=' + '124'
    print('1400')
elif 1711<=x_now and x_now<=2010:
    Queryparams = '?' + 'serviceKey=' + '%2B6LwXwdSiXfBWg2A2q8IXzUCjGP13kzdct07M%2Bu6z9a%2BtwEhnndllUmg%2B9dzpW9ggINqxPfYck050bxzhUAPjw%3D%3D' \
                  + '&pageNo=' + '1' \
                  + '&numOfRows=' + '150' \
                  + '&dataType=' + 'XML' \
                  + '&base_date=' + y \
                  + '&base_time=' + '1700' \
                  + '&nx=' + '56' \
                  + '&ny=' + '124'
    print('1700')
elif 2011<=x_now and x_now<=2310:
    Queryparams = '?' + 'serviceKey=' + '%2B6LwXwdSiXfBWg2A2q8IXzUCjGP13kzdct07M%2Bu6z9a%2BtwEhnndllUmg%2B9dzpW9ggINqxPfYck050bxzhUAPjw%3D%3D' \
                  + '&pageNo=' + '1' \
                  + '&numOfRows=' + '150' \
                  + '&dataType=' + 'XML' \
                  + '&base_date=' + y \
                  + '&base_time=' + '2000' \
                  + '&nx=' + '56' \
                  + '&ny=' + '124'
    print('2000')


url = url + Queryparams

content = requests.get(url).content
dict = xmltodict.parse(content)
jsonString = json.dumps(dict['response']['body']['items']['item'], ensure_ascii=False)
jsonObj = json.loads(jsonString)
#for item in jsonObj:
 #   print(item['fcstDate'],item['fcstTime'],item['category'],item['fcstValue'])
for n in range(150):
    if(jsonObj[n]['fcstDate']==Tomorrow and jsonObj[n]['category']=='POP') :
        print(jsonObj[n]['fcstDate'],jsonObj[n]['fcstTime'],jsonObj[n]['category']+'(강수확률)',jsonObj[n]['fcstValue']+'%')
    if(jsonObj[n]['fcstDate']==Tomorrow and jsonObj[n]['category']=='R06'):
        print(jsonObj[n]['fcstDate'],jsonObj[n]['fcstTime'],jsonObj[n]['category']+'(6시간 강수량)',jsonObj[n]['fcstValue']+'mm')
    if(jsonObj[n]['fcstDate']==Tomorrow and jsonObj[n]['category']=='TMN'):
        print(jsonObj[n]['fcstDate'],jsonObj[n]['fcstTime'],jsonObj[n]['category']+'(최저기온)',jsonObj[n]['fcstValue']+'℃')
'''

today = date.today()
now = datetime.now()
#-------------------------내일 강수확률 / 6시간 누적 강수량 -------------------------
url = 'http://apis.data.go.kr/1360000/VilageFcstInfoService/getVilageFcst'
z=now.minute
if(now.minute<10):
    z = str(0)+str(z)
#print('현재(분): '+ str(z))
x_now=int(str(now.hour)+str(z)) #현재 시간+분/ 인트형
#print('현재(시간 + 분): '+ str(x_now))
y=today.strftime('%Y%m%d')
#print('현재(년도 + 날짜): '+ y)
t=date.today()+timedelta(1)
Tomorrow = t.strftime('%Y%m%d')
#print('내일(년도 + 날짜): '+ Tomorrow)


if 2311<=x_now or x_now<=210:
    Queryparams = '?' + 'serviceKey=' + '%2B6LwXwdSiXfBWg2A2q8IXzUCjGP13kzdct07M%2Bu6z9a%2BtwEhnndllUmg%2B9dzpW9ggINqxPfYck050bxzhUAPjw%3D%3D' \
                    + '&pageNo=' + '1' \
                    + '&numOfRows=' + '150'\
                    + '&dataType=' + 'XML' \
                    + '&base_date=' + y \
                    + '&base_time=' + '2300' \
                    + '&nx=' + '56' \
                    + '&ny=' + '124'
    #print('2300')
elif 211<=x_now and x_now<=510:
    Queryparams = '?' + 'serviceKey=' + '%2B6LwXwdSiXfBWg2A2q8IXzUCjGP13kzdct07M%2Bu6z9a%2BtwEhnndllUmg%2B9dzpW9ggINqxPfYck050bxzhUAPjw%3D%3D' \
                  + '&pageNo=' + '1' \
                  + '&numOfRows=' + '150' \
                  + '&dataType=' + 'XML' \
                  + '&base_date=' + y \
                  + '&base_time=' + '0200' \
                  + '&nx=' + '56' \
                  + '&ny=' + '124'
    #print('0200')
elif 511<=x_now and x_now<=810:
    Queryparams = '?' + 'serviceKey=' + '%2B6LwXwdSiXfBWg2A2q8IXzUCjGP13kzdct07M%2Bu6z9a%2BtwEhnndllUmg%2B9dzpW9ggINqxPfYck050bxzhUAPjw%3D%3D' \
                  + '&pageNo=' + '1' \
                  + '&numOfRows=' + '150' \
                  + '&dataType=' + 'XML' \
                  + '&base_date=' + y \
                  + '&base_time=' + '0500' \
                  + '&nx=' + '56' \
                  + '&ny=' + '124'
    #print('0500')
elif 811<=x_now and x_now<=1110:
    Queryparams = '?' + 'serviceKey=' + '%2B6LwXwdSiXfBWg2A2q8IXzUCjGP13kzdct07M%2Bu6z9a%2BtwEhnndllUmg%2B9dzpW9ggINqxPfYck050bxzhUAPjw%3D%3D' \
                  + '&pageNo=' + '1' \
                  + '&numOfRows=' + '150' \
                  + '&dataType=' + 'XML' \
                  + '&base_date=' + y \
                  + '&base_time=' + '0800' \
                  + '&nx=' + '56' \
                  + '&ny=' + '124'
    #print('0800')
elif 1111<=x_now and x_now<=1410:
    Queryparams = '?' + 'serviceKey=' + '%2B6LwXwdSiXfBWg2A2q8IXzUCjGP13kzdct07M%2Bu6z9a%2BtwEhnndllUmg%2B9dzpW9ggINqxPfYck050bxzhUAPjw%3D%3D' \
                  + '&pageNo=' + '1' \
                  + '&numOfRows=' + '150' \
                  + '&dataType=' + 'XML' \
                  + '&base_date=' + y \
                  + '&base_time=' + '1100' \
                  + '&nx=' + '56' \
                  + '&ny=' + '124'
    #print("1100")
elif 1411<=x_now and x_now<=1710:
    Queryparams = '?' + 'serviceKey=' + '%2B6LwXwdSiXfBWg2A2q8IXzUCjGP13kzdct07M%2Bu6z9a%2BtwEhnndllUmg%2B9dzpW9ggINqxPfYck050bxzhUAPjw%3D%3D' \
                  + '&pageNo=' + '1' \
                  + '&numOfRows=' + '150' \
                  + '&dataType=' + 'XML' \
                  + '&base_date=' + y \
                  + '&base_time=' + '1400' \
                  + '&nx=' + '56' \
                  + '&ny=' + '124'
    #print('1400')
elif 1711<=x_now and x_now<=2010:
    Queryparams = '?' + 'serviceKey=' + '%2B6LwXwdSiXfBWg2A2q8IXzUCjGP13kzdct07M%2Bu6z9a%2BtwEhnndllUmg%2B9dzpW9ggINqxPfYck050bxzhUAPjw%3D%3D' \
                  + '&pageNo=' + '1' \
                  + '&numOfRows=' + '150' \
                  + '&dataType=' + 'XML' \
                  + '&base_date=' + y \
                  + '&base_time=' + '1700' \
                  + '&nx=' + '56' \
                  + '&ny=' + '124'
    #print('1700')
elif 2011<=x_now and x_now<=2310:
    Queryparams = '?' + 'serviceKey=' + '%2B6LwXwdSiXfBWg2A2q8IXzUCjGP13kzdct07M%2Bu6z9a%2BtwEhnndllUmg%2B9dzpW9ggINqxPfYck050bxzhUAPjw%3D%3D' \
                  + '&pageNo=' + '1' \
                  + '&numOfRows=' + '150' \
                  + '&dataType=' + 'XML' \
                  + '&base_date=' + y \
                  + '&base_time=' + '2000' \
                  + '&nx=' + '56' \
                  + '&ny=' + '124'
    #print('2000')


url = url + Queryparams

content = requests.get(url).content
dict = xmltodict.parse(content)
jsonString = json.dumps(dict['response']['body']['items']['item'], ensure_ascii=False)
jsonObj = json.loads(jsonString)
#for item in jsonObj:
 #   print(item['fcstDate'],item['fcstTime'],item['category'],item['fcstValue'])
#print("<내일 날씨>")
O=[]

for n in range(150):
    if(jsonObj[n]['fcstDate']==Tomorrow and jsonObj[n]['category']=='POP') :
        #print(jsonObj[n]['fcstTime']+"시",'강수확률',jsonObj[n]['fcstValue']+'%')
        O.append(jsonObj[n]['fcstValue'])
    #if(jsonObj[n]['fcstDate']==Tomorrow and jsonObj[n]['category']=='R06'):
     #   print(jsonObj[n]['fcstDate'],jsonObj[n]['fcstTime']+"시",jsonObj[n]['category']+'(6시간 강수량)',jsonObj[n]['fcstValue']+'mm')
    if(jsonObj[n]['fcstDate']==Tomorrow and jsonObj[n]['category']=='TMN'):
        Tmin = jsonObj[n]['fcstValue']
    if(jsonObj[n]['fcstDate']==Tomorrow and jsonObj[n]['category']=='TMX'):
        Tmax = jsonObj[n]['fcstValue']
#print("내일 최저 기온: "+ Tmin+"," , "내일 최고 기온: " + Tmax)
if(int(O[0])>=50 or int(O[1])>=50 or int(O[2])>=50 or int(O[3])>=50):
    #print("오전에 비")
    am = 'rain'
else:
    #print("오전 비 X")
    am = 'clear'
if(int(O[4])>=50 or int(O[5])>=50 or int(O[6])>=50 or int(O[7])>=50):
    #print("오후에 비")
    pm = 'rain'
else:
    #print("오후 비 X")
    pm = 'clear'

json_obj = {
    'am' : am,
    'pm' : pm,
    'mintemp' : Tmin,
    'maxtemp' : Tmax
}
json_string = json.dumps(json_obj)
print(json_string)