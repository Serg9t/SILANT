from platform import machine
from rest_framework import serializers
from rest_framework.fields import SerializerMethodField

from .models import (
    Machine,
    Maintenance,
    Complaint,
    ServiceCompany,
    MachineModel,
    EngineModel,
    TransmissionModel,
    DriveAxleMoel,
    SteeringAxleModel,
    TypeMaintenance,
    FailurePoint,
    RestorationMethod,
)


class MachineModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = MachineModel
        fields = ["name", "description"]


class EngineModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = EngineModel
        fields = ["name", "description"]


class TransmissionModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = TransmissionModel
        fields = ["name", "description"]


class DriveAxleMoelSerializer(serializers.ModelSerializer):
    class Meta:
        model = DriveAxleMoel
        fields = ["name", "description"]


class SteeringAxleModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = SteeringAxleModel
        fields = ["name", "description"]


#  ===============================================================  #


class StandartMachineInfoSerializer(serializers.ModelSerializer):
    machine_model = MachineModelSerializer()
    engine_model = EngineModelSerializer()
    transmission_model = TransmissionModelSerializer()
    drive_axle_model = DriveAxleMoelSerializer()
    steering_axle_model = SteeringAxleModelSerializer()

    class Meta:
        model = Machine
        fields = [
            "serial_number_machine",
            "machine_model",
            "engine_model",
            "engine_serial_number",
            "transmission_model",
            "transmission_serial_number",
            "drive_axle_model",
            "drive_axle_serial_number",
            "steering_axle_model",
            "steering_axle_serial_number",
        ]


class FullInfoMachineSerializer(serializers.ModelSerializer):
    machine_model = MachineModelSerializer()
    engine_model = EngineModelSerializer()
    transmission_model = TransmissionModelSerializer()
    drive_axle_model = DriveAxleMoelSerializer()
    steering_axle_model = SteeringAxleModelSerializer()

    client = SerializerMethodField()
    consumer = SerializerMethodField()
    contract = SerializerMethodField()
    shipment_date = SerializerMethodField()
    delivery_address = SerializerMethodField()
    options = SerializerMethodField()
    service_company = SerializerMethodField()

    @staticmethod
    def check_user(request, is_auth, manager, client, service_company, user, obj_client, obj_company):
        return True if request and is_auth and (
            manager or (client and obj_client == user) or (service_company and user == obj_company)) else False


    def get_client(self, obj):
        request = self.context.get('request', None)
        if self.check_user(request, request.user.is_authenticated, request.user.manager, request.user.client, request.user.service_company,
                        request.user, obj.client, obj.service_company):
            return obj.client.company if obj.client else '-'
        return '-'
    
    def get_consumer(self, obj):
        request = self.context.get('request', None)
        if self.check_user(request, request.user.is_authenticated, request.user.manager, request.user.client, request.user.service_company,
                        request.user, obj.client, obj.service_company):
            return obj.consumer if obj.consumer else '-'
        return '-'
    
    def get_contract(self, obj):
        request = self.context.get('request', None)
        if self.check_user(request, request.user.is_authenticated, request.user.manager, request.user.client, request.user.service_company,
                        request.user, obj.client, obj.service_company):
            return obj.contract if obj.contract else '-'
        return '-'
    
    def get_shipment_date(self, obj):
        request = self.context.get('request', None)
        if self.check_user(request, request.user.is_authenticated, request.user.manager, request.user.client, request.user.service_company,
                        request.user, obj.client, obj.service_company):
            return obj.shipment_date if obj.shipment_date else '-'
        return '-'
    
    def get_delivery_address(self, obj):
        request = self.context.get('request', None)
        if self.check_user(request, request.user.is_authenticated, request.user.manager, request.user.client, request.user.service_company,
                        request.user, obj.client, obj.service_company):
            return obj.delivery_address if obj.delivery_address else '-'
        return '-'
    
    def get_options(self, obj):
        request = self.context.get('request', None)
        if self.check_user(request, request.user.is_authenticated, request.user.manager, request.user.client, request.user.service_company,
                        request.user, obj.client, obj.service_company):
            return obj.options if obj.options else '-'
        return '-'
    
    def get_service_company(self, obj):
        print(obj.service_company.company)
        request = self.context.get('request', None)
        if self.check_user(request, request.user.is_authenticated, request.user.manager, request.user.client, request.user.service_company,
                        request.user, obj.client, obj.service_company):
            return obj.service_company.company if obj.service_company.company else '-'
        return '-'

    class Meta:
        model = Machine
        fields = [
            "serial_number_machine",
            "machine_model",
            "engine_model",
            "engine_serial_number",
            "transmission_model",
            "transmission_serial_number",
            "drive_axle_model",
            "drive_axle_serial_number",
            "steering_axle_model",
            "steering_axle_serial_number",
            "client",
            "consumer",
            "contract",
            "shipment_date",
            "delivery_address",
            "options",
            "service_company",
        ]


class MaintenanceSerializer(serializers.ModelSerializer):
    serial_number_machine = serializers.CharField(source='machine.serial_number_machine')
    maintenance_type = serializers.CharField(source='maintenance_type.name')
    service_company = serializers.CharField(source='service_company.name')
    name = serializers.CharField(source='machine.machine_model.name')
    description = serializers.CharField(source='machine.machine_model.description')

    class Meta:
        model = Maintenance
        fields = [
            'id',
            'name',
            'description',
            'serial_number_machine', 
            'maintenance_type', 
            'maintenance_date', 
            'hours_worked', 
            'order_number', 
            'order_date', 
            'service_company',
        ]


class ComplaintSerializer(serializers.ModelSerializer):
    machine = serializers.CharField(source='machine.serial_number_machine', read_only=True)
    failure_point = serializers.CharField(source='failure_point.name', read_only=True)
    restoration_method = serializers.CharField(source='restoration_method.name', read_only=True)
    name = serializers.CharField(source='machine.machine_model.name')
    description = serializers.CharField(source='machine.machine_model.description')

    service_company = serializers.SerializerMethodField()

    def get_service_company(self, obj):
        request = self.context.get('request', None)
        if request and request.user.is_authenticated:
            return obj.machine.service_company.company

    class Meta:
        model = Complaint
        fields = [
            "id",
            'name',
            'description',
            "machine",
            "date_refusal",
            "hours_worked",
            "failure_point",
            "failure_description",
            "restoration_method",
            "used_spare_parts",
            "restoration_date",
            "tech_downtime",
            "service_company",
        ]
