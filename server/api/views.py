from rest_framework import viewsets
from django_filters import rest_framework as filters
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import permissions

from .models import Machine, Maintenance, Complaint
from .serializers import StandartMachineInfoSerializer, FullInfoMachineSerializer, MaintenanceSerializer, ComplaintSerializer
from .permissions import MaintenancePermission, ComplaintPermission, ManagerPermission
from .filters import MachineFilter


class MachineBasicInfoFilter(filters.FilterSet):
    serial_number = filters.CharFilter(field_name='serial_number_machine', lookup_expr='iexact')

    class Meta:
        model = Machine
        fields = ['serial_number_machine']


class StandartInfoViewSet(viewsets.ModelViewSet):
    queryset = Machine.objects.all()
    serializer_class = StandartMachineInfoSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = MachineFilter

    def get_permissions(self):
        if self.action in ['create', 'update', 'destroy']:
            return [ManagerPermission()]
        else:
            return [AllowAny()]


class FullInfoMachineViewSet(viewsets.ModelViewSet):
    queryset = Machine.objects.all()
    serializer_class = FullInfoMachineSerializer

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [IsAuthenticated()]
        elif self.action in ['create', 'update', 'destroy']:
            return [ManagerPermission()]
        return [IsAuthenticated()]


class MaintenanceViewSet(viewsets.ModelViewSet):
    queryset = Maintenance.objects.all()
    serializer_class = MaintenanceSerializer
    permission_classes = [MaintenancePermission]

    def get_queryset(self):
        user = self.request.user
        if user.is_authenticated:
            if user.client:
                return Maintenance.objects.filter(machine__client=user)
            elif user.service_company:
                return Maintenance.objects.filter(machine__service_company=user)
        return super().get_queryset()


class ComplaintViewSet(viewsets.ModelViewSet):
    queryset = Complaint.objects.all()
    serializer_class = ComplaintSerializer
    permission_classes = [ComplaintPermission]

    def get_queryset(self):
        user = self.request.user
        if user.manager:
            return Complaint.objects.all()
        elif user.client:
            return Complaint.objects.filter(machine__client=user)
        elif user.service_company:
            return Complaint.objects.filter(machine__service_company=user)

        return Complaint.objects.none()
