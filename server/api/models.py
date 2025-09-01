from django.db import models

from user.models import User


class ServiceCompany(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name


class MachineModel(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name


class EngineModel(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name


class TransmissionModel(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name


class DriveAxleMoel(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name


class SteeringAxleModel(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name


class TypeMaintenance(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name


class FailurePoint(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name


class RestorationMethod(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name


class Machine(models.Model):
    serial_number_machine = models.CharField(max_length=100, unique=True)
    machine_model = models.ForeignKey(MachineModel, on_delete=models.RESTRICT)
    engine_model = models.ForeignKey(EngineModel, on_delete=models.RESTRICT)
    engine_serial_number = models.CharField(max_length=100)
    transmission_model = models.ForeignKey(TransmissionModel, on_delete=models.RESTRICT)
    transmission_serial_number = models.CharField(max_length=100)
    drive_axle_model = models.ForeignKey(DriveAxleMoel, on_delete=models.RESTRICT)
    drive_axle_serial_number = models.CharField(max_length=100)
    steering_axle_model = models.ForeignKey(SteeringAxleModel, on_delete=models.RESTRICT)
    steering_axle_serial_number = models.CharField(max_length=100)
    contract = models.CharField(max_length=100)
    shipment_date = models.DateField()
    consumer = models.CharField(max_length=200)
    delivery_address = models.CharField(max_length=200)
    options = models.TextField()
    client = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    service_company = models.ForeignKey(User, on_delete=models.CASCADE, related_name='service')

    def __str__(self):
        return self.serial_number_machine
    
    # Сортировка по дате
    class Meta:
        ordering = ['-shipment_date']
        indexes = [
            models.Index(fields=['-shipment_date'])
        ]


class Maintenance(models.Model):
    machine = models.ForeignKey(Machine, on_delete=models.CASCADE)
    maintenance_type = models.ForeignKey(TypeMaintenance, on_delete=models.RESTRICT)
    maintenance_date = models.DateField()
    hours_worked = models.IntegerField()
    order_number = models.CharField(max_length=100)
    order_date = models.DateField()  
    service_company = models.ForeignKey(ServiceCompany, on_delete=models.RESTRICT, null=True, blank=True)

    def __str__(self):
        return self.machine.serial_number_machine
    
    # Сортировка по дате
    class Meta:
        ordering = ['-maintenance_date']
        indexes = [
            models.Index(fields=['-maintenance_date'])
        ]


class Complaint(models.Model):
    machine = models.ForeignKey(Machine, on_delete=models.CASCADE, related_name='complaint')
    date_refusal = models.DateField()
    hours_worked = models.IntegerField()
    failure_point = models.ForeignKey(FailurePoint, null=True, blank=True, on_delete=models.RESTRICT)
    failure_description = models.TextField()
    restoration_method = models.ForeignKey(RestorationMethod, null=True, blank=True, on_delete=models.RESTRICT)
    used_spare_parts = models.TextField(blank=True, null=True)
    restoration_date = models.DateField()
    tech_downtime = models.IntegerField()

    def __str__(self):
        return f"{self.failure_point} - {self.date_refusal}"
    
    # Сортировка по дате
    class Meta:
        ordering = ['-date_refusal']
        indexes = [
            models.Index(fields=['-date_refusal'])
        ]
    

    
    