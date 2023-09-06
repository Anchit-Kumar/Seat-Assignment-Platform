from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializers import EmployeeSerializer, SeatingChartStateSerializer, IndexedSeatingSerializer
from .models import Employees, SeatingChartState, IndexedSeating


# Create your views here.
def front(request):
    context = { }
    return render(request, "index.html", context)


@api_view(['GET', 'POST'])
def employee(request):
    if request.method == 'GET':
        employee = Employees.objects.all()
        serializer = EmployeeSerializer(employee, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = EmployeeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def employee_detail(request, pk):
    try:
        employee = Employees.objects.get(pk=pk)
    except Employees.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'DELETE':
        employee.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET', 'POST'])
def seating_chart_state(request):
    if request.method == 'GET':
        # Retrieve the last saved state
        state_object = SeatingChartState.objects.last()
        serializer = SeatingChartStateSerializer(state_object)
        return Response(serializer.data)

    elif request.method == 'POST':
        # Save the newly toggled state
        serializer = SeatingChartStateSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST'])
def indexed_seating(request):
    if request.method == 'GET':
        # Retrieve the last saved indexed state
        state_object = IndexedSeating.objects.last()
        serializer = IndexedSeatingSerializer(state_object)
        return Response(serializer.data)

    elif request.method == 'POST':
        # Save the newly indexed state
        serializer = IndexedSeatingSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)