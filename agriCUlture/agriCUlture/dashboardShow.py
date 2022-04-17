from django.shortcuts import render

def dashboard(request):
    context          = {}
    context['hello'] = 'Hello World!'
    return render(request, 'dashboard.html', context)