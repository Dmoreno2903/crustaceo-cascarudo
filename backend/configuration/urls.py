# Librerías
from django.conf import settings
from django.views.static import serve
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include, re_path

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/user/', include('user.urls')),
    path('api/product/', include('product.urls'))
]

# Agregamos las rutas para la visualización de las imágenes
urlpatterns += [
    re_path(r'^media/(?P<path>.*)$', serve, {
        'document_root': settings.MEDIA_ROOT,
    })
]

urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)