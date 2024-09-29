from django.db import models
from django.contrib.auth.models import AbstractUser
from product.models import PARSER


class ShoppingCart(models.Model):
    """ Model for the Shopping Cart

    :id: ID
    :attr products: Products
    :attr length: Length of the products
    :attr total: Total
    :attr created_at: Created At
    :attr updated_at: Updated At

    JSON Structure:
    {
        "product_id": quantity,
        "product_id": quantity,
    }
    """

    id = models.AutoField(primary_key=True)
    products = models.JSONField(default=dict, blank=True, null=True)
    length = models.IntegerField(default=0, null=True, blank=True)
    total = models.FloatField(default=0, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        """ Save the Shopping Cart """
        if self.products:
            # Convert the prefix to the instance
            models = {
                prefix: PARSER[prefix[0:3]]
                for prefix in self.products.keys()
            }

            # Calculate the total and length
            self.length = sum(list(map(lambda x: int(x), self.products.values())))
            self.total = 0
            for id, quantity in self.products.items():
                self.total += models[id].objects.get(id=id).price * int(quantity)

            return super(ShoppingCart, self).save(*args, **kwargs)
        
        self.length = 0
        self.total = 0
        self.products = {}
        return super(ShoppingCart, self).save(*args, **kwargs)

    def __str__(self):
        return f'Shopping Cart {self.id}'

    class Meta:
        verbose_name = 'Shopping Cart'
        verbose_name_plural = 'Shopping Carts'
        db_table = 'ShoppingCart'

class User(AbstractUser):
    """ Model for the Custom User
    
    :attr username: Username
    :attr email: Email
    :attr first_name: First Name
    :attr last_name: Last Name
    :attr is_active: Is Active
    :attr is_staff: Is Staff
    :attr is_superuser: Is Superuser
    :attr date_joined: Date Joined
    :attr last_login: Last Login

    # Custom Fields
    :attr type: Type (Administrator, Client)
    :attr phone: Phone
    :attr address: Address
    :attr birthdate: Birthdate
    """

    class Type(models.TextChoices):
        ADMINISTRATOR = 'Administrator'
        CLIENT = 'Client'

    # Custom Fields
    type = models.CharField(max_length=20, choices=Type.choices, default=Type.CLIENT)
    phone = models.CharField(max_length=20, null=True, blank=True)
    address = models.CharField(max_length=255, null=True, blank=True)
    birthdate = models.DateField(null=True, blank=True)
    shoopingcart = models.OneToOneField(
        ShoppingCart, 
        on_delete=models.CASCADE,
        null=True, blank=True
    )

    image = models.ImageField(upload_to='users/', null=True, blank=True)

    def save(self, *args, **kwargs):
        """ Save the User """
        if not self.shoopingcart:
            self.shoopingcart = ShoppingCart.objects.create()
        return super(User, self).save(*args, **kwargs)

    def __str__(self):
        return self.username
    
    class Meta:
        verbose_name = 'User'
        verbose_name_plural = 'Users'
        db_table = 'User'
