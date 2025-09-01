from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import User


# admin.site.register(User, UserAdmin)

@admin.register(User)
class MyUserAdmin(UserAdmin):
    list_display = ['username', 'company', 'service_company']
    fieldsets = UserAdmin.fieldsets
    fieldsets += (
        ('Extra Fields', {"fields": ("company", "client", "service_company", "manager")}),
    )
