from rest_framework import serializers
from django.db import transaction  # Para manejar transacciones de base de datos
from accounting import models as accounting_models
from product import models as product_models
from user import models as user_models

class SaleDetailSerializer(serializers.ModelSerializer):
    """ Serializador para los productos vendidos """

    class Meta:
        model = accounting_models.ProductSold
        fields = ['product', 'price', 'quantity']
    

class SaleSerializer(serializers.ModelSerializer):
    """ Serializador para la venta """

    class Meta:
        model = accounting_models.Sale
        fields = []  # Inicialmente vacío, se ajustará en __init__

    def __init__(self, *args, **kwargs):
        """ Ajusta los campos en función del método de la solicitud """
        request = kwargs.get('context', {}).get('request', None)
        method = request.method if request else 'POST'
        
        if method == 'GET':
            # Campos requeridos para GET
            self.Meta.fields = ['id', 'price', 'created_at']
        else:
            # Campos requeridos para POST
            self.Meta.fields = []

        super().__init__(*args, **kwargs)

    def validate(self, attrs):
        """ Validación personalizada para GET y POST """
        request = self.context['request']

        if request.method == 'GET':
            if not attrs.get('user') or not attrs.get('price'):
                raise serializers.ValidationError(
                    "El campo 'user' y 'price' son requeridos para GET."
                )
        return attrs

    def create(self, validated_data):
        """Crea la venta con productos del carrito"""
        user = self.context['request'].user
        cart = user.shoopingcart
        products = cart.products

        if not products:
            raise serializers.ValidationError('No hay productos en el carrito.')

        # Inicia una transacción para asegurar consistencia en la BD
        with transaction.atomic():
            sale = self._create_sale(user)
            try:
                self._process_products(sale, products)
                self._clear_cart(cart)
            except Exception as error:
                sale.delete()
                raise serializers.ValidationError(str(error))

            return sale

    def _create_sale(self, user):
        """Crea una instancia de venta"""
        return accounting_models.Sale.objects.create(user=user)

    def _process_products(self, sale, products):
        """Procesa y guarda los productos vendidos"""
        for id, quantity in products.items():
            product_instance = self._get_product_instance(id)

            if not product_instance:
                raise serializers.ValidationError(f'Producto con ID: {id} no encontrado.')

            # Crear instancia de producto vendido
            accounting_models.ProductSold.objects.create(
                sale=sale,
                quantity=quantity,
                price=product_instance.price * quantity,
                product=id
            )

            # Actualizar stock y precio total de la venta
            self._update_stock(product_instance, quantity)
            sale.price += product_instance.price * quantity
            sale.save()

    def _get_product_instance(self, product_id):
        """Obtiene la instancia del producto basado en el ID"""
        model = product_models.PARSER[product_id[:3]]  # El ID contiene un prefijo que indica el modelo
        return model.objects.filter(id=product_id).first()

    def _update_stock(self, product_instance, quantity):
        """Actualiza el stock del producto"""
        if product_instance.count < quantity:
            raise serializers.ValidationError(f'Stock insuficiente para el producto: {product_instance.id}')
        
        product_instance.count -= quantity
        product_instance.save()

    def _clear_cart(self, cart):
        """Limpia el carrito después de la venta"""
        cart.products = {}
        cart.save()