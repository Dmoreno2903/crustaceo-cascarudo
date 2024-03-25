# Define the serializers for the models

# Libraries
from rest_framework import serializers

# Models
from .models import Burguer, Fries, Drink


# Burguer serializer
class BurguerSerializer(serializers.ModelSerializer):
    """
    Burguer serializer
    """
    class Meta:
        model = Burguer
        fields = ['name', 'description', 'price', 'image']

class BurguerThumbnailSerializer(serializers.ModelSerializer):
    """
    Burguer serializer
    """
    class Meta:
        model = Burguer
        fields = ['name', 'price', 'image']

# Fries serializer
class FriesSerializer(serializers.ModelSerializer):
    """
    Fries serializer
    """
    class Meta:
        model = Fries
        fields = ['name', 'description', 'price', 'image']

class FriesThumbnailSerializer(serializers.ModelSerializer):
    """
    Fries serializer
    """
    class Meta:
        model = Fries
        fields = ['name', 'price', 'image']


# Drink serializer
class DrinkSerializer(serializers.ModelSerializer):
    """
    Drink serializer
    """
    class Meta:
        model = Drink
        fields = ['name', 'description', 'price', 'image']

class DrinkThumbnailSerializer(serializers.ModelSerializer):
    """
    Drink serializer
    """
    class Meta:
        model = Drink
        fields = ['name', 'price', 'image']