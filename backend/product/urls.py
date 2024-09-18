
# Dependences
from rest_framework.routers import DefaultRouter
from product.api import views

# Create the router
router = DefaultRouter()

# Register the views
router.register(r'products', views.ProductsViewSet, basename='Products')

# Get the urls and add the paths
urlpatterns = router.urls