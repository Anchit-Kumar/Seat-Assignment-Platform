# Generated by Django 4.2.4 on 2023-09-07 06:47

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("core", "0011_indexedseating_employee_schedule"),
    ]

    operations = [
        migrations.AddField(
            model_name="employees",
            name="schedule",
            field=models.JSONField(default=dict),
        ),
    ]