# -*- coding: utf-8 -*-
from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
import json

# this method will run when we first go to http://127.0.0.1:8000/dashboard/ website
def dashboard(request):
    return render(request, 'dashboard.html')


@csrf_exempt
def ajax_json(request):
    time_dict = {'time': ['0h', '2h', '4h', '6h', '8h', '10h', '12h', '14h', '16h', '18h', '20h', '22h']}
    return HttpResponse(json.dumps(time_dict), content_type='application/json')