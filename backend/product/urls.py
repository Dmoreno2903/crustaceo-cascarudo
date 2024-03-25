
# Add the paths

# Libraries
from rest_framework.routers import DefaultRouter

# Import the views
from .views import BurguerViewSet, FriesViewSet, DrinkViewSet

# Create the router
router = DefaultRouter()

# Register the views
router.register(r'burguers', BurguerViewSet, basename='burguers')
router.register(r'fries', FriesViewSet, basename='fries')
router.register(r'drinks', DrinkViewSet, basename='drinks')

# Get the urls and add the paths
urlpatterns = router.urls