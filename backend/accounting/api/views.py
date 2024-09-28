
from rest_framework import viewsets
from accounting.api import serializers
from accounting import models
from rest_framework import response, status

class SaleViewSet(viewsets.ModelViewSet):
    """ Vista personalizada, recibe una petición de un usuario
    Coge si carrito de compras, registar la compra y envía un correo
    notificando la compra realizada
    """
    serializer_class = serializers.SaleSerializer
    queryset = models.Sale.objects.all()

    def create(self, request, *args, **kwargs):
        """ Registra la venta en la base de datos
        """
        serializer = serializers.SaleSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return response.Response({"message": 'Venta creada con éxito'}, status=status.HTTP_201_CREATED)
        return response.Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def list(self, request, *args, **kwargs):
        """ Lista todas las ventas del usuario
        """
        # Verificamos si se trata de un rating
        is_rating = request.query_params.get('rating', None)
        id = request.query_params.get('id', None)

        if is_rating and id:
            sale = models.Sale.objects.filter(id=request.query_params.get('id'))
            if not sale:
                return response.Response({"message": 'Venta no encontrada'}, status=status.HTTP_404_NOT_FOUND)
            
            if sale.first().user != request.user:
                return response.Response({"message": 'No tienes permisos para ver esta venta'}, status=status.HTTP_403_FORBIDDEN)

            queryset = models.ProductSold.objects.filter(sale=sale.first(), product__startswith='BUR')
            serializer = serializers.SaleDetailSerializer(queryset, context={'request': request}, many=True)
            return response.Response(serializer.data, status=status.HTTP_200_OK)

        # Recibimos el parametro id de la venta
        if request.query_params.get('id', None):
            sale = models.Sale.objects.filter(id=request.query_params.get('id'))
            if not sale:
                return response.Response({"message": 'Venta no encontrada'}, status=status.HTTP_404_NOT_FOUND)
            
            if sale.first().user != request.user:
                return response.Response({"message": 'No tienes permisos para ver esta venta'}, status=status.HTTP_403_FORBIDDEN)

            queryset = models.ProductSold.objects.filter(sale=sale.first())
            serializer = serializers.SaleDetailSerializer(queryset, context={'request': request}, many=True)
            return response.Response(serializer.data, status=status.HTTP_200_OK)
        
        queryset = models.Sale.objects.filter(user=request.user)
        serializer = serializers.SaleSerializer(queryset, context={'request': request}, many=True)
        return response.Response(serializer.data, status=status.HTTP_200_OK)
        
