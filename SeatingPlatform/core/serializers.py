from rest_framework import serializers
from .models import Employees, SeatingChartState, IndexedSeating

class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employees
        fields = '__all__'

class SeatingChartStateSerializer(serializers.ModelSerializer):
    class Meta:
        model = SeatingChartState
        fields = '__all__'

class IndexedSeatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = IndexedSeating
        fields = '__all__'