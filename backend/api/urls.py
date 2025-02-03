from django.urls import path
# from .views import hello_world
from . import views

# urlpatterns = [
#     path('hello/', hello_world),  # `http://localhost:8000/api/hello/` でアクセス可能
# ]

urlpatterns = [
    path('record-dinner/', views.record_dinner, name='record_dinner'),
    path('history/', views.history, name='history'),
]