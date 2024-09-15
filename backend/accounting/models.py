from django.db import models
from user.models import User

class Sale(models.Model):
    """ Modelo que almacena las ventas realizadas

    Atributos:
    :attr id (str): Identificador de la venta
    :attr user (str): Usuario que realizó la venta
    :attr price (float): Total de la venta
    :attr created_at (datetime): Fecha de creación de la venta
    """
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    price = models.FloatField(default=0, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Compra de {self.user} - ${self.price}"
    
    class Meta:
        verbose_name = 'Sale'
        verbose_name_plural = 'Sales'
        db_table = 'Sales'


class ProductSold(models.Model):
    """ Almacena los productos vendidos 
    
    Atributos:
    :attr id (str): Identificador
    :attr sale (str): Venta a la que pertenece
    :attr price (float): Precio del producto
    :attr product (str): Producto vendido"""

    id = models.AutoField(primary_key=True)
    sale = models.ForeignKey(Sale, on_delete=models.CASCADE)
    quantity = models.IntegerField()
    price = models.FloatField()
    product = models.CharField(max_length=100)

    def __str__(self):
        return f"Producto vendido: {self.product} - ${self.price}"
    
    class Meta:
        verbose_name = 'Product Sold'
        verbose_name_plural = 'Products Sold'
        db_table = 'Products-Sold'
    
