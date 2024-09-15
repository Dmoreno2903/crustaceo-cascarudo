from django.contrib import admin
from accounting import models

# Register your models here.
@admin.register(models.Sale)
class SaleAdmin(admin.ModelAdmin):
    """ Sale Admin """
    list_display = ['id', 'user', 'price', 'created_at']
    search_fields = ['id', 'price']
    list_filter = ['created_at']
    ordering = ['id']
    readonly_fields = ['id', 'price', 'created_at']
    fieldsets = (
        ("Information", {
            'fields': ('id', 'price', 'created_at')
        }),
        ('User', {
            'fields': ('user',)
        })
    )


@admin.register(models.ProductSold)
class ProductSoldAdmin(admin.ModelAdmin):
    """ Product Sold Admin """
    list_display = ['id', 'sale', 'quantity', 'price', 'product']
    search_fields = ['id', 'product']
    list_filter = ['sale']
    ordering = ['id']
    readonly_fields = ['id', 'price']
    fieldsets = (
        ("Information", {
            'fields': ('id', 'price')
        }),
        ('Sale', {
            'fields': ('sale', 'quantity', 'product')
        })
    )