from django.urls import path

from . import views

urlpatterns = [
    path('v1/', views.index, name='index'),
    path('v1/game/', views.index, name='index'),
    path('v1/game/add', views.add, name='add')
]
