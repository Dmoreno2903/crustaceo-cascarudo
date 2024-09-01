from django.contrib import admin
from product import models

@admin.register(models.Burguer)
class BurguerAdmin(admin.ModelAdmin):
    """ Burguer Admin """
    list_display = ['id', 'name', 'price', 'count', 'score', 'is_outstanding']
    search_fields = ['name', ]
    readonly_fields = ['id', 'registers', 'score', 'comments', 'created_at']
    ordering = ['id']
    fieldsets = (
        ("Information", {
            'fields': ('id', 'name', 'price', 'description', 'count', 'created_at')
        }),
        ('Score', {
            'fields': ('is_outstanding', 'comments', 'registers', 'score')
        }),
        ('Image', {
            'fields': ('image', )
        })
    )

@admin.register(models.Drink)
class DrinkAdmin(admin.ModelAdmin):
    """ Drink Admin """
    list_display = ['id', 'name', 'price', 'count', 'created_at']
    search_fields = ['name', ]
    readonly_fields = ['id', 'created_at']
    ordering = ['id']
    fieldsets = (
        ("Information", {
            'fields': ('id', 'name', 'price', 'description', 'count', 'created_at')
        }),
        ('Image', {
            'fields': ('image', )
        })

    )

@admin.register(models.Fries)
class FriesAdmin(admin.ModelAdmin):
    """ Fries Admin """
    list_display = ['id', 'name', 'price', 'count', 'created_at']
    search_fields = ['name', ]
    ordering = ['id']
    readonly_fields = ['id', 'created_at']
    fieldsets = (
        ("Information", {
            'fields': ('id', 'name', 'price', 'description', 'count', 'created_at')
        }),
        ('Image', {
            'fields': ('image', )
        })

    )