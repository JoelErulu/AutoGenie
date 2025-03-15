
from django.urls import path
from . import views

urlpatterns = [
    path('vin/', views.get_vin_details, name='get_vin_details'),
]
