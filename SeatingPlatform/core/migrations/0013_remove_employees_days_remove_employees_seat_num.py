# Generated by Django 4.2.4 on 2023-09-07 08:20

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("core", "0012_employees_schedule"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="employees",
            name="days",
        ),
        migrations.RemoveField(
            model_name="employees",
            name="seat_num",
        ),
    ]
