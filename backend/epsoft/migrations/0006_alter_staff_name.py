# Generated by Django 5.2 on 2025-05-12 05:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("epsoft", "0005_staff_inputnumber"),
    ]

    operations = [
        migrations.AlterField(
            model_name="staff",
            name="Name",
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
    ]
