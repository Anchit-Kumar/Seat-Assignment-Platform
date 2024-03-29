# Generated by Django 4.2.4 on 2023-09-06 05:42

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("core", "0005_seatingchartstate_cols_seatingchartstate_rows"),
    ]

    operations = [
        migrations.CreateModel(
            name="IndexedSeating",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("replicated_array", models.JSONField()),
                ("valid_seats", models.JSONField()),
            ],
        ),
    ]
