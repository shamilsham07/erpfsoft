# Generated by Django 5.2 on 2025-05-23 09:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("epsoft", "0016_epfcalculation_date"),
    ]

    operations = [
        migrations.AlterField(
            model_name="epfcalculation",
            name="edli",
            field=models.FloatField(blank=True, default=0, null=True),
        ),
        migrations.AlterField(
            model_name="epfcalculation",
            name="ee",
            field=models.FloatField(blank=True, default=0, null=True),
        ),
        migrations.AlterField(
            model_name="epfcalculation",
            name="epf",
            field=models.FloatField(blank=True, default=0, null=True),
        ),
        migrations.AlterField(
            model_name="epfcalculation",
            name="eps",
            field=models.FloatField(blank=True, default=0, null=True),
        ),
        migrations.AlterField(
            model_name="epfcalculation",
            name="eps_employer",
            field=models.FloatField(blank=True, default=0, null=True),
        ),
        migrations.AlterField(
            model_name="epfcalculation",
            name="er",
            field=models.FloatField(blank=True, default=0, null=True),
        ),
        migrations.AlterField(
            model_name="epfcalculation",
            name="gross",
            field=models.FloatField(blank=True, default=0, null=True),
        ),
        migrations.AlterField(
            model_name="epfcalculation",
            name="ncp_days",
            field=models.FloatField(blank=True, default=0, null=True),
        ),
        migrations.AlterField(
            model_name="epfcalculation",
            name="refund",
            field=models.FloatField(blank=True, default=0, null=True),
        ),
    ]
