# -*- coding: utf-8 -*-
from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
import json
import random


########### this method will run when we first go to http://127.0.0.1:8000/dashboard/ website #########################
def dashboard(request):
    return render(request, 'dashboard.html')



############ When using streaming, go to a new website. Using kafka here ###############################################
def dashboardStream(request):
    year_choose =  request.POST['yearSelected']
    print(year_choose)
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
    print(res_dict['corn_real'])
    return HttpResponse(json.dumps(res_dict), content_type='application/json')


#################################Showing the latest current data when first visit http://127.0.0.1:8000/dashboard/ #####
@csrf_exempt
def first_onload_show(request):
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
    return HttpResponse(json.dumps(res_dict), content_type='application/json')



#################################Showing the selected data when click "submit" on the left control bar##################
@csrf_exempt
def show_selected(request):

    #get data from dataset to show the different data. If the user choose year not 2022, do not show predication,
    #otherwise, run prediction model
#     print(f'request: {request.POST}')
    print(request.POST['year'])
#     print(request.POST['agri[]'])
    if request.POST['year'] == '2018':
        res_dict = {
                    'time': ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                    'corn_real': [0, 0, 0, 0, 0, 0, 0, "-", "-", "-", "-", "-"],
                    'corn_pred': ["-", "-", "-", "-", "-", "-", 210, 230, 120, 230, 210, 120],
                    'wheat_real':[],
                    'wheat_pred':["-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
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

    else:
        res_dict = {
                    'time': ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                    'corn_real': [0, 0, 0, 0, 0, 0, 0, "-", "-", "-", "-", "-"],
                    'corn_pred': ["-", "-", "-", "-", "-", "-", 0, 0, 0, 0, 0, 120],
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
    return HttpResponse(json.dumps(res_dict), content_type='application/json')


