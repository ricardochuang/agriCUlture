"""agriCUlture URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from . import dashboardShow
from . import map

urlpatterns = [
#     path('admin/', admin.site.urls),
    path('dashboard/', dashboardShow.dashboard),
    path('dashboard/map',map.USA),
    path('ajax/json/', dashboardShow.first_onload_show),
    path('ajax/map/tem', dashboardShow.first_onload_show_map_tem),
    path('ajax/map/pre', dashboardShow.first_onload_show_map_pre),
    path('results/',dashboardShow.show_selected),
    path('results/map',dashboardShow.show_selected_map),
    path('results/map_pre',dashboardShow.show_selected_map_pre),
    path('dashboardStream/',dashboardShow.dashboardStream),
    path('ajax/json/stream/', dashboardShow.stream),
]
