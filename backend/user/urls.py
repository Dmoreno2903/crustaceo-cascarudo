
# Libraries
from django.urls import path

# Import the views
from .views import ClientView, AdministratorView

# Add the urls of the app
urlpatterns = [
    path(r'client/', ClientView.as_view(), name='client'),
    path(r'administrator/', AdministratorView.as_view(), name='administrator'),
]