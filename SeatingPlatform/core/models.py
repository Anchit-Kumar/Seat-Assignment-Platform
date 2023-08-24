from django.db import models

# Create your models here.
class Employees(models.Model):
    name = models.CharField(max_length=60)
    seat_num = models.IntegerField()
    days = models.CharField(max_length=30)

    def __str__(self):
        return self.name