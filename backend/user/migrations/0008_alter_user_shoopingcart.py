# Generated by Django 5.0.3 on 2024-09-01 02:51

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0007_remove_shoppingcart_user_user_shoopingcart'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='shoopingcart',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='user.shoppingcart'),
        ),
    ]
