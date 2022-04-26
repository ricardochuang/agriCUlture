# -*- coding: utf-8 -*-

from django.shortcuts import render
from django.http import HttpResponse


# this method will run when we first go to http://127.0.0.1:8000/search/ website
def dashboard(request):
    return render(request, 'dashboard.html')