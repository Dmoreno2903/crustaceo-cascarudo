from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.forms import AdminPasswordChangeForm
from user import models

@admin.register(models.User)
class UserAdmin(BaseUserAdmin):
    """ Custom User Admin """
    list_display = ['username', 'email', 'first_name', 'last_name', 'phone', 'address', 'birthdate', 'type', 'shoopingcart']
    search_fields = ['username', 'email', 'first_name', 'last_name', 'phone', 'address', 'birthdate', 'type']
    list_filter = ['type']
    ordering = ['id']
    readonly_fields = ['date_joined', 'last_login', 'is_staff', 'is_superuser', 'shoopingcart']

    fieldsets = (
        ("General information", {
            'fields': ('username', 'email', 'first_name', 'last_name', 'phone', 'address', 'birthdate', 'type', 'image')
        }),
        ('Advanced information', {
            'fields': ('is_active', 'date_joined', 'last_login', 'is_staff', 'is_superuser')
        }),
        ('Password', {
            'fields': ('password',)
        }),
        ('Shopping Cart', {
            'fields': ('shoopingcart',)
        })
    )
    
    # Especifica el formulario para el cambio de contraseña
    change_password_form = AdminPasswordChangeForm

    # Agrega un botón en el admin para cambiar la contraseña
    def get_urls(self):
        from django.urls import path
        urls = super().get_urls()
        custom_urls = [
            path(
                '<id>/password/',
                self.admin_site.admin_view(self.user_change_password),
                name='auth_user_password_change',
            ),
        ]
        return custom_urls + urls



@admin.register(models.ShoppingCart)
class ShoppingCartAdmin(admin.ModelAdmin):
    """ ShoppingCart Admin """
    list_display = ['id', 'length', 'total', 'created_at', 'updated_at', 'products']
    search_fields = ['id', 'length', 'total']
    list_filter = ['created_at', 'updated_at']
    ordering = ['id']
    readonly_fields = ['id', 'length', 'total', 'created_at', 'updated_at']
    fieldsets = (
        ("Information", {
            'fields': ('id', 'length', 'total', 'created_at', 'updated_at')
        }),
        ('Products', {
            'fields': ('products',)
        })
    )