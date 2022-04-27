# -*- coding: utf-8 -*-

from django.shortcuts import render

# this method will run when we first go to http://127.0.0.1:8000/dashboard/ website
def dashboard(request):
    return render(request, 'dashboard.html')