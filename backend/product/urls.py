
# Dependences
from rest_framework.routers import DefaultRouter
from product.api import views

# Create the router
router = DefaultRouter()

# Register the views
router.register(r'burguers', views.BurguerViewSet, basename='Burguers')
router.register(r'fries', views.FriesViewSet, basename='Fries')
router.register(r'drinks', views.DrinkViewSet, basename='Drinks')

# Get the urls and add the paths
urlpatterns = router.urls