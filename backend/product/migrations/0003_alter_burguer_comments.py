# Generated by Django 5.0.3 on 2024-09-01 01:33

import django.contrib.postgres.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('product', '0002_alter_burguer_registers'),
    ]

    operations = [
        migrations.AlterField(
            model_name='burguer',
            name='comments',
            field=django.contrib.postgres.fields.ArrayField(base_field=models.TextField(), blank=True, default=list, size=None),
        ),
    ]
