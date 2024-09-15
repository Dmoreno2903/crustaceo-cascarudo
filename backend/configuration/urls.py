# Librerías
from django.conf import settings
from django.views.static import serve
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include, re_path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('admin/', admin.site.urls, name='Admin'),
    path('login/', TokenObtainPairView.as_view(), name='User login'),
    path('refresh/', TokenRefreshView.as_view(), name='Login refresh')
]

# Agregamos las rutas de las aplicaciones locales
urlpatterns += [
    path('user/', include('user.urls'), name='Users'),
    path('product/', include('product.urls'), name='Products'),
    path('accounting/', include('accounting.urls'), name='Accounting'),
]

# Agregamos las rutas para la visualización de las imágenes 
# (solo en desarrollo)
if settings.DEBUG:

    urlpatterns += [
        re_path(r'^media/(?P<path>.*)$', serve, {
            'document_root': settings.MEDIA_ROOT,
        })
    ]

    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)