# Library for models
from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator

# Create your models here.
class Base(models.Model):
    """
    Base model for all products

    Attributes:
        name: Name of the product
        price: Price of the product
        description: Description of the product
        image: Image of the product
        is_oustading: If the product is outstanding
        count: Number of products available
        created_at: Date of creation
    """

    name = models.CharField(max_length=100)
    price = models.FloatField()
    description = models.TextField()
    image = models.ImageField(upload_to='products/', null=True, blank=True)
    is_outstanding = models.BooleanField(default=False)
    count = models.IntegerField(default=0, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        abstract = True

    def __str__(self):
        return self.name


class Burguer(Base):
    """
    Burguer model

    Attributes:
        score: Score of the burguer
        name: Name of the burguer
        price: Price of the burguer
        description: Description of the burguer
        image: Image of the burguer
        count: Number of burguers available
        created_at: Date of creation
        product: Base model
    """
    score = models.PositiveIntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)])

    class Meta:
        db_table = 'burguer'
        verbose_name = 'Burguer'
        verbose_name_plural = 'Burguers'


class Fries(Base):
    """
    Fries model

    Attributes:
        name: Name of the burguer
        price: Price of the burguer
        description: Description of the burguer
        image: Image of the burguer
        count: Number of burguers available
        created_at: Date of creation
    """

    class Meta:
        db_table = 'fries'
        verbose_name = 'Fries'
        verbose_name_plural = 'Fries'


class Drink(Base):
    """
    Drinks model

    Attributes:
        name: Name of the burguer
        price: Price of the burguer
        description: Description of the burguer
        image: Image of the burguer
        count: Number of burguers available
        created_at: Date of creation
    """

    class Meta:
        db_table = 'drink'
        verbose_name = 'Drink'
        verbose_name_plural = 'Drinks'