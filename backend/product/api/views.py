
# Libraries
from product import models
from product.api import serializers
from rest_framework import status, viewsets
from rest_framework.response import Response

# Views for the client
class ProductsViewSet(viewsets.ReadOnlyModelViewSet):
    """ Vista para listar los productos disponibles """
    
    authentication_classes = []
    permission_classes = []

    def __init__(self, *args, **kwargs) -> None:
        super().__init__(*args, **kwargs)

    def list(self, request, *args, **kwargs):

        id = request.query_params.get('id', None)
        if not id:
            burguers = models.Burguer.objects.filter(count__gt=0)
            fries = models.Fries.objects.filter(count__gt=0)
            drinks = models.Drink.objects.filter(count__gt=0)

            burguers_serializer = serializers.BurguerSerializer(burguers, many=True)
            fries_serializer = serializers.FriesSerializer(fries, many=True)
            drinks_serializer = serializers.DrinkSerializer(drinks, many=True)

            return Response({
                'burguers': burguers_serializer.data,
                'fries': fries_serializer.data,
                'drinks': drinks_serializer.data
            }, status=status.HTTP_200_OK)
        
        prefix = id[:3] if id else None
        if prefix == 'BUR':
            burguer = models.Burguer.objects.filter(id=id)
            if not burguer:
                return Response({'message': 'Burguer not found'}, status=status.HTTP_404_NOT_FOUND)
            
            serializer = serializers.BurguerSerializer(burguer.first())
            return Response(serializer.data, status=status.HTTP_200_OK)

        elif prefix == 'FRI':
            fries = models.Fries.objects.filter(id=id)
            if not fries:
                return Response({'message': 'Fries not found'}, status=status.HTTP_404_NOT_FOUND)
            
            serializer = serializers.FriesSerializer(fries.first())
            return Response(serializer.data, status=status.HTTP_200_OK)

        elif prefix == 'DRI':
            drink = models.Drink.objects.filter(id=id)
            if not drink:
                return Response({'message': 'Drink not found'}, status=status.HTTP_404_NOT_FOUND)
            
            serializer = serializers.DrinkSerializer(drink.first())
            return Response(serializer.data, status=status.HTTP_200_OK)
