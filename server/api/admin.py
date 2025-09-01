from django.contrib import admin

from .models import (
    ServiceCompany, MachineModel, EngineModel,
    TransmissionModel, DriveAxleMoel, SteeringAxleModel,
    TypeMaintenance, FailurePoint, RestorationMethod,
    Machine, Maintenance, Complaint
)


@admin.register(Machine)
class MachineAdmin(admin.ModelAdmin):
    list_display = ['serial_number_machine', 'machine_model', 'engine_model', 'transmission_model', 'drive_axle_model',
                    'steering_axle_model', 'service_company']

admin.site.register(ServiceCompany)
admin.site.register(MachineModel)
admin.site.register(EngineModel)
admin.site.register(TransmissionModel)
admin.site.register(DriveAxleMoel)
admin.site.register(SteeringAxleModel)
admin.site.register(TypeMaintenance)
admin.site.register(FailurePoint)
admin.site.register(RestorationMethod)
admin.site.register(Maintenance)
admin.site.register(Complaint)
