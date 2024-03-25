
# Libraries
from rest_framework.viewsets import ReadOnlyModelViewSet
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status


# Create your views here
from .models import Burguer, Fries, Drink

# Serializers
from .serializers import BurguerSerializer, BurguerThumbnailSerializer, FriesSerializer, FriesThumbnailSerializer, DrinkSerializer, DrinkThumbnailSerializer

# Views for the client
class BurguerViewSet(ReadOnlyModelViewSet):
    """
    Burguer view set
    """
    # Get the all burguers
    def list(self, request, *args, **kwargs):
        """
        Get the all burguers
        """
        self.serializer_class = BurguerThumbnailSerializer
        self.queryset = Burguer.objects.filter(count__gt=0)

        return super().list(request, *args, **kwargs, status=status.HTTP_200_OK)

    # Get the burguer detail
    def retrieve(self, request, *args, **kwargs):
        """
        Get the burguer detail
        """
        self.serializer_class = BurguerSerializer
        self.queryset = Burguer.objects.filter(count__gt=0)

        return super().retrieve(request, *args, **kwargs)

    # Get oustanding burguers
    @action(detail=False, methods=['get'], url_path='outstanding', url_name='outstanding')
    def getOustandingBurguers(self, request, *args, **kwargs):
        """
        Get oustanding burguers
        """
        queryset = Burguer.objects.filter(count__gt=0, is_outstanding=True)
        serializer = BurguerThumbnailSerializer(queryset, many=True, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)


class FriesViewSet(ReadOnlyModelViewSet):
    """
    Fries view set
    """

    # Get the all fries
    def list(self, request, *args, **kwargs):
        """
        Get the all fries
        """
        self.serializer_class = FriesThumbnailSerializer
        self.queryset = Fries.objects.filter(count__gt=0)

        return super().list(request, *args, **kwargs, status=status.HTTP_200_OK)

    # Get the fries detail
    def retrieve(self, request, *args, **kwargs):
        """
        Get the fries detail
        """
        self.serializer_class = FriesSerializer
        self.queryset = Fries.objects.filter(count__gt=0)

        return super().retrieve(request, *args, **kwargs, status=status.HTTP_200_OK)

    # Get oustanding fries
    @action(detail=False, methods=['get'], url_path='outstanding', url_name='outstanding')
    def getOustandingFries(self, request, *args, **kwargs):
        """
        Get oustanding fries
        """
        queryset = Fries.objects.filter(count__gt=0, is_outstanding=True)
        serializer = FriesThumbnailSerializer(queryset, many=True, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)


class DrinkViewSet(ReadOnlyModelViewSet):
    """
    Drink view set
    """

    # Get the all drinks
    def list(self, request, *args, **kwargs):
        """
        Get the all drinks
        """
        self.serializer_class = DrinkThumbnailSerializer
        self.queryset = Drink.objects.filter(count__gt=0)

        return super().list(request, *args, **kwargs, status=status.HTTP_200_OK)

    # Get the drink detail
    def retrieve(self, request, *args, **kwargs):
        """
        Get the drink detail
        """
        self.serializer_class = DrinkSerializer
        self.queryset = Drink.objects.filter(count__gt=0)

        return super().retrieve(request, *args, **kwargs, status=status.HTTP_200_OK)

    # Get oustanding drinks
    @action(detail=False, methods=['get'], url_path='outstanding', url_name='outstanding')
    def getOustandingDrinks(self, request, *args, **kwargs):
        """
        Get oustanding drinks
        """
        queryset = Drink.objects.filter(count__gt=0, is_outstanding=True)
        serializer = DrinkThumbnailSerializer(queryset, many=True, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)



