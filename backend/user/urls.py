
# Dependencies
from django.urls import path, include
from rest_framework import routers
from user.api import views

# Router
router = routers.DefaultRouter()

# Register the views
router.register('register', views.RegisterView, basename='Register')
router.register('profile', views.UserProfile, basename='Profile')
router.register('shoppingcart', views.ShoppingCartView, basename='ShoppingCart')

# URLs
urlpatterns = router.urls