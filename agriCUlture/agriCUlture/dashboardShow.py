# -*- coding: utf-8 -*-
from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
import json
import csv
import random


FILE_NAME = '../data/sum.csv'

########### this method will run when we first go to http://127.0.0.1:8000/dashboard/ website #########################
def dashboard(request):
    return render(request, 'dashboard.html')



############ When using streaming, go to a new website. Using kafka here ###############################################
def dashboardStream(request):
    return render(request, 'dashboardStream.html')



#################################Showing the streaming data  ##########################################################
@csrf_exempt
def stream(request):
    # This data show be the latest data including real and predication to show in the very beginning
    res_dict = {'time': ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                'corn_real': [24, 40, 101, 134, 90, 230, 210, "-", "-", "-", "-", "-"],
                'corn_pred': ["-", "-", "-", "-", "-", "-", 210, 230, 120, 230, 210, 120],
                'wheat_real':[40, 64, 191, 324, 290, 330, 310,"-", "-", "-", "-", "-"],
                'wheat_pred':["-", "-", "-", "-", "-", "-", 310, 213, 180, 200, 180, 79],
                'rice_real':[12, 17, 34, 28, 16, 11, 6, "-", "-", "-", "-", "-"],
                'rice_pred':["-", "-", "-", "-", "-", "-", 6, 19, 15, 23, 19, 40],
                'temp_real':[24, 40, 101, 134, 90, 230, 210, "-", "-", "-", "-", "-"],
                'temp_pred':["-", "-", "-", "-", "-", "-", 210, 230, 120, 230, 210, 120],
                'atmospheric_real':[26, 18, 81, 74, 97, 60, 100, "-", "-", "-", "-", "-"],
                'atmospheric_pred':["-", "-", "-", "-", "-", "-", 100, 201, 210, 170, 140, 160],
                'airQuality_real':[45, 84, 91, 74, 160, 250, 140, "-", "-", "-", "-", "-"],
                'airQuality_pred':["-", "-", "-", "-", "-", "-", 140, 231, 278, 322, 160, 94],
                'moisture_real':[10, 15, 32, 34, 38, 42, 46, "-", "-", "-", "-", "-"],
                'moisture_pred':["-", "-", "-", "-", "-", "-", 46, 21, 14, 13, 17, 20],
                'precipitation_real':[12, 17, 34, 28, 16, 11, 6, "-", "-", "-", "-", "-"],
                'precipitation_pred':["-", "-", "-", "-", "-", "-", 6, 19, 15, 23, 19, 40],
    }

    res_dict['corn_real'][0] += (random.randint(0,9) * 100)
    res_dict['temp_real'][0] += (random.randint(0,9) * 100)
    print(res_dict['corn_real'])
    print(res_dict['temp_real'])
    return HttpResponse(json.dumps(res_dict), content_type='application/json')


#################################Showing the latest current data when first visit http://127.0.0.1:8000/dashboard/ #####
@csrf_exempt
def first_onload_show(request):
    # This data show be the latest data including real and predication to show in the very beginning
    # print(request.POST['agri[]'])

    res_dict = {
        'time': [],
        'corn_real': [],
        'corn_pred': [],
        'wheat_real': [],
        'wheat_pred': [],
        'rice_real': [],
        'rice_pred': [],
        'temp_real': [],
        'temp_pred': [],
        'atmospheric_real': [],
        'atmospheric_pred': [],
        'airQuality_real': [],
        'airQuality_pred': [],
        'moisture_real': [],
        'moisture_pred': [],
        'precipitation_real': [],
        'precipitation_pred': [],
    }

    data = get_all_data()
    for d in data:
        # print(d)
        year = d[0].split('/')[2]
        month = d[0].split('/')[0]
        # print(f'year: {year}')
        if year == '2020':
            res_dict['time'].append(month)
            res_dict['corn_real'].append(d[1])
            res_dict['corn_pred'].append('-')
            res_dict['wheat_real'].append(d[2])
            res_dict['wheat_pred'].append('-')
            res_dict['rice_real'].append(d[3])
            res_dict['rice_pred'].append('-')
            res_dict['temp_real'].append(d[6])
            res_dict['temp_pred'].append('-')
            res_dict['atmospheric_real'].append('-')
            res_dict['atmospheric_pred'].append('-')
            res_dict['airQuality_real'].append('-')
            res_dict['airQuality_pred'].append('-')
            res_dict['moisture_real'].append('-')
            res_dict['moisture_pred'].append('-')
            res_dict['precipitation_real'].append(d[5])
            res_dict['precipitation_pred'].append('-')
        '''
        date, corn_price, wheat_price, milk_price, cattle_price, precipitation, temperature
        1/1/60, 1, 1.78, 4.37, 20.5, 32.99, -3.8
        2/1/60, 1.01, 1.8, 4.29, 20.9, 58.92, -2.66
        '''
        # print(res_dict)
    return HttpResponse(json.dumps(res_dict), content_type='application/json')



#################################Showing the selected data when click "submit" on the left control bar##################
@csrf_exempt
def show_selected(request):

    #get data from dataset to show the different data. If the user choose year not 2022, do not show predication,
    #otherwise, run prediction model
    # print(f'request: {request.POST}')
    print(request.POST['year'])
    # print(request.POST['agri[]'])

    res_dict = {
        'time': [],
        'corn_real': [],
        'corn_pred': [],
        'wheat_real': [],
        'wheat_pred': [],
        'rice_real': [],
        'rice_pred': [],
        'temp_real': [],
        'temp_pred': [],
        'atmospheric_real': [],
        'atmospheric_pred': [],
        'airQuality_real': [],
        'airQuality_pred': [],
        'moisture_real': [],
        'moisture_pred': [],
        'precipitation_real': [],
        'precipitation_pred': [],
    }

    data = get_all_data()
    for d in data:
        # print(d)
        year = d[0].split('/')[2]
        month = d[0].split('/')[0]
        # print(f'year: {year}')
        if request.POST['year'] == year:
            res_dict['time'].append(month)
            res_dict['corn_real'].append(d[1])
            res_dict['corn_pred'].append('-')
            res_dict['wheat_real'].append(d[2])
            res_dict['wheat_pred'].append('-')
            res_dict['rice_real'].append(d[3])
            res_dict['rice_pred'].append('-')
            res_dict['temp_real'].append(d[6])
            res_dict['temp_pred'].append('-')
            res_dict['atmospheric_real'].append('-')
            res_dict['atmospheric_pred'].append('-')
            res_dict['airQuality_real'].append('-')
            res_dict['airQuality_pred'].append('-')
            res_dict['moisture_real'].append('-')
            res_dict['moisture_pred'].append('-')
            res_dict['precipitation_real'].append(d[5])
            res_dict['precipitation_pred'].append('-')
        '''
        date, corn_price, wheat_price, milk_price, cattle_price, precipitation, temperature
        1/1/60, 1, 1.78, 4.37, 20.5, 32.99, -3.8
        2/1/60, 1.01, 1.8, 4.29, 20.9, 58.92, -2.66
        '''
        # print(res_dict)

    return HttpResponse(json.dumps(res_dict), content_type='application/json')

#################################Showing the latest current Average Temperature map data when first visit http://127.0.0.1:8000/dashboard/ #####
@csrf_exempt
def first_onload_show_map_tem(request):
    # This data show be the latest data including real and predication to show in the very beginning
    res_dict ={
   "1":{
      "name":"Alabama",
      "value":17.1	
   },
   "2":{
      "name":"Alaska",
      "value":-3.0
   },
   "3":{
      "name":"Arizona",
      "value":15.7
   },
   "4":{
      "name":"Arkansas",
      "value":15.8
   },
   "5":{
      "name":"California",
      "value":15.2
   },
   "6":{
      "name":"Colorado",
      "value":7.3
   },
   "7":{
      "name":"Connecticut",
      "value":9.4
   },
   "8":{
      "name":"Delaware",
      "value":12.9
   },
   "9":{
      "name":"District of Columbia",
      "value": 12.3
   },
   "10":{
      "name":"Florida",
      "value":21.5
   },
   "11":{
      "name":"Georgia",
      "value":17.5
   },
   "12":{
      "name":"Hawaii",
      "value":21.1
   },
   "13":{
      "name":"Idaho",
      "value":6.9
   },
   "14":{
      "name":"Illinois",
      "value":11.0
   },
   "15":{
      "name":"Indiana",
      "value":10.9
   },
   "16":{
      "name":"Iowa",
      "value":8.8
   },
   "17":{
      "name":"Kansas",
      "value":12.4
   },
   "18":{
      "name":"Kentucky",
      "value":13.1
   },
   "19":{
      "name":"Louisiana",
      "value":19.1
   },
   "20":{
      "name":"Maine",
      "value":5.0
   },
   "21":{
      "name":"Maryland",
      "value":12.3
   },
   "22":{
      "name":"Massachusetts",
      "value":8.8
   },
   "23":{
      "name":"Michigan",
      "value":6.9
   },
   "24":{
      "name":"Minnesota",
      "value":5.1
   },
   "25":{
      "name":"Mississippi",
      "value":17.4
   },
   "26":{
      "name":"Missouri",
      "value":12.5
   },
   "27":{
      "name":"Montana",
      "value":5.9
   },
   "28":{
      "name":"Nebraska",
      "value":9.3
   },
   "29":{
      "name":"Nevada",
      "value":9.9
   },
   "30":{
      "name":"New Hampshire",
      "value":6.6
   },
   "31":{
      "name":"New Jersey",
      "value":11.5
   },
   "32":{
      "name":"New Mexico",
      "value":11.9
   },
   "33":{
      "name":"New York",
      "value":7.4
   },
   "34":{
      "name":"North Carolina",
      "value":15.0
   },
   "35":{
      "name":"North Dakota",
      "value":4.7
   },
   "36":{
      "name":"Ohio",
      "value":10.4
   },
   "37":{
      "name":"Oklahoma",
      "value":15.3
   },
   "38":{
      "name":"Oregon",
      "value":9.1
   },
   "39":{
      "name":"Pennsylvania",
      "value":9.3
   },
   "40":{
      "name":"Rhode Island",
      "value":10.1
   },
   "41":{
      "name":"South Carolina",
      "value":16.9
   },
   "42":{
      "name":"South Dakota",
      "value":7.3
   },
   "43":{
      "name":"Tennessee",
      "value":14.2
   },
   "44":{
      "name":"Texas",
      "value":18.2
   },
   "45":{
      "name":"Utah",
      "value":9.2
   },
   "46":{
      "name":"Vermont",
      "value":6.1
   },
   "47":{
      "name":"Virginia",
      "value":12.8
   },
   "48":{
      "name":"Washington",
      "value":9.1
   },
   "49":{
      "name":"West Virginia",
      "value":11.0
   },
   "50":{
      "name":"Wisconsin",
      "value":6.2
   },
   "51":{
      "name":"Wyoming",
      "value":5.6
   },
   "52":{
      "name":"Puerto Rico",
      "value":26
   }
}
    return HttpResponse(json.dumps(res_dict), content_type='application/json')


#################################Showing the latest current Average Temperature map data when first visit http://127.0.0.1:8000/dashboard/ #####
@csrf_exempt
def first_onload_show_map_pre(request):
    # This data show be the latest data including real and predication to show in the very beginning
    res_dict ={
   "1":{
      "name":"Alabama",
      "value":1480
   },
   "2":{
      "name":"Alaska",
      "value":572
   },
   "3":{
      "name":"Arizona",
      "value":345
   },
   "4":{
      "name":"Arkansas",
      "value":1284
   },
   "5":{
      "name":"California",
      "value":563
   },
   "6":{
      "name":"Colorado",
      "value":405
   },
   "7":{
      "name":"Connecticut",
      "value":1279
   },
   "8":{
      "name":"Delaware",
      "value":1160
   },
   "9":{
      "name":"District of Columbia",
      "value":1052
   },
   "10":{
      "name":"Florida",
      "value":1385
   },
   "11":{
      "name":"Georgia",
      "value":1287
   },
   "12":{
      "name":"Hawaii",
      "value":1618
   },
   "13":{
      "name":"Idaho",
      "value":481
   },
   "14":{
      "name":"Illinois",
      "value":996
   },
   "15":{
      "name":"Indiana",
      "value":1060
   },
   "16":{
      "name":"Iowa",
      "value":864
   },
   "17":{
      "name":"Kansas",
      "value":733
   },
   "18":{
      "name":"Kentucky",
      "value":1242
   },
   "19":{
      "name":"Louisiana",
      "value":1528
   },
   "20":{
      "name":"Maine",
      "value":1072
   },
   "21":{
      "name":"Maryland",
      "value":1131
   },
   "22":{
      "name":"Massachusetts",
      "value":1211
   },
   "23":{
      "name":"Michigan",
      "value":833
   },
   "24":{
      "name":"Minnesota",
      "value":693
   },
   "25":{
      "name":"Mississippi",
      "value":1499
   },
   "26":{
      "name":"Missouri",
      "value":1071
   },
   "27":{
      "name":"Montana",
      "value":390
   },
   "28":{
      "name":"Nebraska",
      "value":599
   },
   "29":{
      "name":"Nevada",
      "value":241
   },
   "30":{
      "name":"New Hampshire",
      "value":1103
   },
   "31":{
      "name":"New Jersey",
      "value":1196
   },
   "32":{
      "name":"New Mexico",
      "value":370
   },
   "33":{
      "name":"New York",
      "value":1062
   },
   "34":{
      "name":"North Carolina",
      "value":1279
   },
   "35":{
      "name":"North Dakota",
      "value":452
   },
   "36":{
      "name":"Ohio",
      "value":993
   },
   "37":{
      "name":"Oklahoma",
      "value":927
   },
   "38":{
      "name":"Oregon",
      "value":695
   },
   "39":{
      "name":"Pennsylvania",
      "value":1089
   },
   "40":{
      "name":"Rhode Island",
      "value":1218
   },
   "41":{
      "name":"South Carolina",
      "value":1264
   },
   "42":{
      "name":"South Dakota",
      "value":511
   },
   "43":{
      "name":"Tennessee",
      "value":1376
   },
   "44":{
      "name":"Texas",
      "value":734
   },
   "45":{
      "name":"Utah",
      "value":310
   },
   "46":{
      "name":"Vermont",
      "value":1085
   },
   "47":{
      "name":"Virginia",
      "value":1125
   },
   "48":{
      "name":"Washington",
      "value":976
   },
   "49":{
      "name":"West Virginia",
      "value":1147
   },
   "50":{
      "name":"Wisconsin",
      "value":829
   },
   "51":{
      "name":"Wyoming",
      "value":328
   },
   "52":{
      "name":"Puerto Rico",
      "value":795
   }
}
    return HttpResponse(json.dumps(res_dict), content_type='application/json')


def get_all_data():
    res = []
    with open(FILE_NAME, encoding='utf-8-sig') as fh:
        reader = csv.reader(fh)
        for row in reader:
            res.append(row)
            # send(topic_name, data)
            # [date, corn_price, wheat_price, milk_price, cattle_price, precipitation, temperature]

    return res

