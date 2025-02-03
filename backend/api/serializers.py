from rest_framework import serializers
from .models import DinnerRecord

class DinnerRecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = DinnerRecord
        fields = ['date', 'dish_name', 'description']
