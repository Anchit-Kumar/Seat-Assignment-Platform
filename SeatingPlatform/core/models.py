from django.db import models
import json

# Create your models here.
class Employees(models.Model):
    name = models.CharField(max_length=60)
    seat_num = models.IntegerField()
    days = models.CharField(max_length=30)

    def __str__(self):
        return self.name



class SeatingChartState(models.Model):
    # stores the grid in 2D array format where each element is a boolean indicating
    # if the seat is toggled valid or invalid
    state_data = models.JSONField()
    rows = models.IntegerField(default=4)
    cols = models.IntegerField(default=4)

class IndexedSeating(models.Model):
    # this array holds false if invalid and the index of the seat if valid
    indexed_array = models.JSONField()
    valid_seats = models.JSONField()
    