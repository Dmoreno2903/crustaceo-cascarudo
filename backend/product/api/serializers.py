
# Dependences
from rest_framework import serializers
from product import models


class BurguerSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Burguer
        fields = ['id', 'name', 'description', 'price', 'score', 'image']


class FriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Fries
        fields = ['id', 'name', 'description', 'price', 'image']


class DrinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Drink
        fields = ['id', 'name', 'description', 'price', 'image']