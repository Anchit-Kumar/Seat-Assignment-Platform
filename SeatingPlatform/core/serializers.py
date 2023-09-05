from rest_framework import serializers
from .models import Employees, SeatingChartState

class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employees
        fields = '__all__'

class SeatingChartStateSerializer(serializers.ModelSerializer):
    class Meta:
        model = SeatingChartState
        fields = '__all__'