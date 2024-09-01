# Library for models
from django.db import models
from django.contrib.postgres.fields import ArrayField
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
        count: Number of products available
        created_at: Date of creation
    """
    id = models.CharField(max_length=100, primary_key=True, editable=False)
    name = models.CharField(max_length=100)
    price = models.FloatField()
    description = models.TextField()
    image = models.ImageField(upload_to='products/', null=True, blank=True)
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
    :attr is_outstanding: If the burguer is outstanding
    :attr comments: Comments about the burguer
    :attr score: Score of the burguer
    """
    is_outstanding = models.BooleanField(default=False)
    comments = ArrayField(
        base_field=models.TextField(),
        blank=True,
        default=list
    )
    registers = ArrayField(
        base_field=models.IntegerField(
            validators=[MinValueValidator(0), MaxValueValidator(5)]
        ),
        blank=True,
        default=list
    )
    score = models.FloatField(default=0)

    # Add the prefix to the id
    def save(self, *args, **kwargs):
        if not self.id:
            last_id = Burguer.objects.all().order_by('id').last()
            self.id = 'BUR' + str(int(last_id.id[3:]) + 1) if last_id else 'BUR1'

        super(Burguer, self).save(*args, **kwargs)


    class Meta:
        db_table = 'Products-Burguer'
        verbose_name = 'Burguer'
        verbose_name_plural = 'Burguers'


class Fries(Base):
    """ Fries model """
    # Add the prefix to the id
    def save(self, *args, **kwargs):
        if not self.id:
            last_id = Fries.objects.all().order_by('id').last()
            self.id = 'FRI' + str(int(last_id.id[3:]) + 1) if last_id else 'FRI1'

        super(Fries, self).save(*args, **kwargs)
    

    class Meta:
        db_table = 'Products-Fries'
        verbose_name = 'Fries'
        verbose_name_plural = 'Fries'


class Drink(Base):
    """ Drink model """
    # Add the prefix to the id
    def save(self, *args, **kwargs):
        if not self.id:
            last_id = Drink.objects.all().order_by('id').last()
            self.id = 'DRI' + str(int(last_id.id[3:]) + 1) if last_id else 'DRI1'

        super(Drink, self).save(*args, **kwargs)

    
    class Meta:
        db_table = 'Products-Drink'
        verbose_name = 'Drink'
        verbose_name_plural = 'Drinks'


PARSER = {
    'BUR': Burguer,
    'FRI': Fries,
    'DRI': Drink
}