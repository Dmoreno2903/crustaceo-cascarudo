
# Libraries
from django.db import models
from django.contrib.auth.models import User


class Administrator(User):
    """
    Define the model for the administrator

    Atributes:
    - user: User -> The user of the administrator
    """

    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)

    def __str__(self):
        return self.username

    class Meta:
        db_table = 'Administrator'
        verbose_name = 'Administrator'
        verbose_name_plural = 'Administrators'


class Client(User):
    """
    Define the model for the client

    Atributes:
    - user: User -> The user of the client
    """

    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    phone = models.CharField(max_length=12)

    def __str__(self):
        return self.username

    class Meta:
        db_table = 'Client'
        verbose_name = 'Client'
        verbose_name_plural = 'Clients'