from rest_framework.permissions import BasePermission


class MaintenancePermission(BasePermission):

    def has_permission(self, request, view):

        print()
        if not request.user.is_authenticated:
            return False

        if view.action in ['list', 'retrieve', 'create']:
            return True 

        if view.action in ['update', 'partial_update', 'destroy']:
            return request.user.service_company or request.user.manager

        return False

    def has_object_permission(self, request, view, obj):

        print(obj.machine.client)
        print(request.user.company)
        if view.action in ['retrieve', 'create']:
            return obj.machine.client == request.user if request.user.client else False

        if view.action in ['update', 'partial_update', 'destroy']:
            return request.user.company == obj.service_company if request.user.service_company else False


        return request.user.manager


class ComplaintPermission(BasePermission):

    def has_permission(self, request, view):

        if not request.user.is_authenticated:
            return False

        if view.action in ['list', 'retrieve']:
            return True

        if view.action in ['create', 'update', 'partial_update', 'destroy']:
            return request.user.service_company or request.user.manager

        return False

    def has_object_permission(self, request, view, obj):
        if view.action in ['retrieve']:
            return obj.machine.client == request.user if request.user.client else False
        if view.action in ['update', 'partial_update', 'destroy']:
            return request.user.company == obj.service_company if request.user.service_company else False
        return request.user.manager


class ManagerPermission(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.manager