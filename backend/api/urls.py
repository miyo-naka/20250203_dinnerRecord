from django.urls import path
from . import views

urlpatterns = [
    path('record-dinner/', views.record_dinner, name='record_dinner'),
    path('history/', views.history, name='history'),
    path('delete-dinner-record/<int:record_id>/', views.delete_dinner_record, name='delete'),
    # path('get_csrf_token/', views.get_csrf_token, name='get_csrf_token'),
    
]