from django.shortcuts import render

def helloworld(request):
    context          = {}
    context['hello'] = 'Hello World!'
    return render(request, 'helloworld.html', context)