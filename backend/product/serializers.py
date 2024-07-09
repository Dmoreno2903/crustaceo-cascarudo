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
        fields = ['id','name', 'price', 'description', 'image']

class BurguerThumbnailSerializer(serializers.ModelSerializer):
    """
    Burguer serializer
    """
    class Meta:
        model = Burguer
        fields = ['id','name', 'price', 'image']

# Fries serializer
class FriesSerializer(serializers.ModelSerializer):
    """
    Fries serializer
    """
    class Meta:
        model = Fries
        fields = ['id','name', 'price', 'description', 'image']

class FriesThumbnailSerializer(serializers.ModelSerializer):
    """
    Fries serializer
    """
    class Meta:
        model = Fries
        fields = ['id', 'name', 'price', 'image']


# Drink serializer
class DrinkSerializer(serializers.ModelSerializer):
    """
    Drink serializer
    """
    class Meta:
        model = Drink
        fields = ['id','name', 'price', 'description', 'image']

class DrinkThumbnailSerializer(serializers.ModelSerializer):
    """
    Drink serializer
    """
    class Meta:
        model = Drink
        fields = ['id', 'name', 'price', 'image']