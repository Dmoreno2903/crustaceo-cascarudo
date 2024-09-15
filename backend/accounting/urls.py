
# Dependences
from rest_framework.routers import DefaultRouter
from accounting.api import views

# Create the router
router = DefaultRouter()

# Register the views
router.register(r'sales', views.SaleViewSet, basename='Solds')

# Get the urls and add the paths
urlpatterns = router.urls