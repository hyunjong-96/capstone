from pyowm import OWM
import json
from datetime import date, timedelta, datetime
import time
'''
today = date.today()
now = datetime.now()

API_key = '8190682fd9f62950487ffc8784f229f8'
owm = OWM(API_key)

obs = owm.weather_at_place('Incheon')
w = obs.get_weather()

#print('Incheon :', w.get_status(), w.get_temperature(unit='celsius')['temp'])
#print('Incheon_Max :',  w.get_temperature(unit='celsius')['temp_max'])
#print('Incheon_Min :',  w.get_temperature(unit='celsius')['temp_min'])

#print(w.get_rain())
json_object={
    'hour' : now.hour,
    'min' : now.minute,
    'year' : today.strftime('%Y'),
    'month' : today.strftime('%m'),
    'day' : today.strftime('%d'),
    'today_clear' : w.get_status(), 
    'today_clear_%' : w.get_temperature(unit='celsius')['temp'],
    'today_maxTemp' : w.get_temperature(unit='celsius')['temp_max'],
    'today_minTemp' :  w.get_temperature(unit='celsius')['temp_min'],
    'today_rain' : w.get_rain()
}
json_string=json.dumps(json_object)
print(json_string)
'''
API_key = '8190682fd9f62950487ffc8784f229f8'
owm = OWM(API_key)
#-----------------------------오늘 날씨 ------------------------------------
obs = owm.weather_at_place('Incheon')
w = obs.get_weather()
W = "error"
if(w.get_status()=="Clouds"):
    W ="cloud"
elif(w.get_status()=="Haze"):
    W = "haze"
elif(w.get_status()=="Clear"):
    W = "clear"
elif(w.get_status()=="Rain"):
    W = "rain"
    '''
print('인천_오늘(기상상태, 현재온도) :', W, "," ,w.get_temperature(unit='celsius')['temp'], "˚C")
print('오늘(최고기온) :',  w.get_temperature(unit='celsius')['temp_max'],"˚C")
print('오늘(최저기온) :',  w.get_temperature(unit='celsius')['temp_min'],"˚C")
'''
json_object={
    'status' : W,
    'temp' : w.get_temperature(unit='celsius')['temp'],
    'maxtemp': w.get_temperature(unit='celsius')['temp_max'],
    'mintemp' : w.get_temperature(unit='celsius')['temp_min']
}
json_string=json.dumps(json_object)
print(json_string)