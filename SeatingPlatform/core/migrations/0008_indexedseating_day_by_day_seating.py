# Generated by Django 4.2.4 on 2023-09-06 08:05

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("core", "0007_rename_replicated_array_indexedseating_indexed_array"),
    ]

    operations = [
        migrations.AddField(
            model_name="indexedseating",
            name="day_by_day_seating",
            field=models.JSONField(default={}),
        ),
    ]
