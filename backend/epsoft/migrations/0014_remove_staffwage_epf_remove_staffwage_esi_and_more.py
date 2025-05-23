# Generated by Django 5.2 on 2025-05-23 05:23

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("epsoft", "0013_staffwage"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="staffwage",
            name="epf",
        ),
        migrations.RemoveField(
            model_name="staffwage",
            name="esi",
        ),
        migrations.RemoveField(
            model_name="staffwage",
            name="totalwage",
        ),
        migrations.AlterField(
            model_name="staffwage",
            name="wage",
            field=models.FloatField(blank=True, null=True),
        ),
        migrations.CreateModel(
            name="epfcalculation",
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
                ("epf", models.FloatField(blank=True, null=True)),
                ("eps", models.FloatField(blank=True, null=True)),
                ("edli", models.FloatField(blank=True, null=True)),
                ("gross", models.FloatField(blank=True, null=True)),
                ("ee", models.FloatField(blank=True, null=True)),
                ("eps_employer", models.FloatField(blank=True, null=True)),
                ("er", models.FloatField(blank=True, null=True)),
                ("ncp_days", models.FloatField(blank=True, null=True)),
                ("refund", models.FloatField(blank=True, null=True)),
                (
                    "staffid",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="epsoft.staff"
                    ),
                ),
                (
                    "wage",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="epsoft.staffwage",
                    ),
                ),
            ],
        ),
    ]
