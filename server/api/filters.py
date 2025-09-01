from django_filters import rest_framework as filters
from django_filters.rest_framework import FilterSet

from .models import Machine


class MachineFilter(FilterSet):
    serial_number = filters.CharFilter(field_name='serial_number_machine', lookup_expr='iexact')

    class Meta:
        model = Machine
        fields = ['serial_number_machine']