from django.shortcuts import render

# Create your views here.
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import DinnerRecord
from .serializers import DinnerRecordSerializer

# def hello_world(request):
#     return JsonResponse({"message": "Hello, World!"})

@api_view(['POST'])
def record_dinner(request):
    if request.method == 'POST':
        serializer = DinnerRecordSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "記録が保存されました！"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

def history(request):
    dinners = DinnerRecord.objects.all()
    data = list(dinners.values("id", "date", "dish_name", "description"))
    return JsonResponse(data, safe=False)