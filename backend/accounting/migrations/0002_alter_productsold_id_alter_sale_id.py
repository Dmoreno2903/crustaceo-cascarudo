# Generated by Django 5.0.3 on 2024-09-15 21:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounting', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='productsold',
            name='id',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='sale',
            name='id',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
    ]