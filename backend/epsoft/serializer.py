from rest_framework import serializers
from .models import *


class MyModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Staff
        fields = '__all__'
        
class MyModelSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField()
    class Meta:
        model = epfcalculation
        fields = ["name","er","epf",""]
        