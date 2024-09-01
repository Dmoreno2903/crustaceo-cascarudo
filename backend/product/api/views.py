
# Libraries
from product import models
from product.api import serializers
from rest_framework import status, viewsets
from rest_framework.decorators import action

# Views for the client
class BurguerViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = serializers.BurguerSerializer
    queryset = models.Burguer.objects.filter(count__gt=0)

    # Get the all burguers
    def list(self, request, *args, **kwargs):
        """ Get the all burguers """
        return super().list(request, *args, **kwargs, status=status.HTTP_200_OK)

    # Get the burguer detail
    def retrieve(self, request, *args, **kwargs):
        """ Get the burguer detail """
        return super().retrieve(request, *args, **kwargs, status=status.HTTP_200_OK)

    # Get oustanding burguers
    @action(detail=False, methods=['get'], url_path='outstanding', url_name='outstanding')
    def getOustandingBurguers(self, request, *args, **kwargs):
        """
        Get oustanding burguers
        """
        self.queryset = models.Burguer.objects.filter(count__gt=0, is_outstanding=True)
        return super().list(request, *args, **kwargs, status=status.HTTP_200_OK)


class FriesViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = serializers.FriesSerializer
    queryset = models.Fries.objects.filter(count__gt=0)

    # Get the all fries
    def list(self, request, *args, **kwargs):
        """ Get the all fries """
        return super().list(request, *args, **kwargs, status=status.HTTP_200_OK)

    # Get the fries detail
    def retrieve(self, request, *args, **kwargs):
        """ Get the fries detail """
        return super().retrieve(request, *args, **kwargs, status=status.HTTP_200_OK)
    

class DrinkViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = serializers.DrinkSerializer
    queryset = models.Drink.objects.filter(count__gt=0)

    # Get the all drinks
    def list(self, request, *args, **kwargs):
        """ Get the all drinks """
        return super().list(request, *args, **kwargs, status=status.HTTP_200_OK)

    # Get the drink detail
    def retrieve(self, request, *args, **kwargs):
        """ Get the drink detail """
        return super().retrieve(request, *args, **kwargs, status=status.HTTP_200_OK)

