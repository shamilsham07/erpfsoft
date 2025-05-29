from rest_framework import serializers
from .models import *


class MyModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Staff
        fields = '__all__'
        

        