from django.contrib import admin
from user import models

@admin.register(models.User)
class UserAdmin(admin.ModelAdmin):
    """ User Admin """
    list_display = ['username', 'email', 'first_name', 'last_name', 'phone', 'address', 'birthdate', 'type', 'shoopingcart']
    search_fields = ['username', 'email', 'first_name', 'last_name', 'phone', 'address', 'birthdate', 'type']
    list_filter = ['type']
    ordering = ['id']
    readonly_fields = ['date_joined', 'last_login', 'is_staff', 'is_superuser', 'shoopingcart']
    fieldsets = (
        ("General information", {
            'fields': ('username', 'email', 'first_name', 'last_name', 'phone', 'address', 'birthdate', 'type')
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