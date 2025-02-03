from django.shortcuts import render

# Create your views here.
from django.http import JsonResponse
from .models import DinnerRecord
from .serializers import DinnerRecordSerializer

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from django.views.decorators.csrf import csrf_exempt
# from django.views.decorators.csrf import ensure_csrf_cookie
# from django.utils.decorators import method_decorator
# from django.middleware.csrf import get_token

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


@csrf_exempt
def delete_dinner_record(request, record_id):
    if request.method == "DELETE":
        try:
            record = DinnerRecord.objects.get(id=record_id)
            record.delete()
            return JsonResponse({"message": "削除成功"}, status=200)
        except DinnerRecord.DoesNotExist:
            return JsonResponse({"error": "記録が見つかりません"}, status=404)
    return JsonResponse({"error": "無効なリクエスト"}, status=400)

# @ensure_csrf_cookie
# def get_csrf_token(request):
#     return JsonResponse({"csrfToken": get_token(request)})
