from django.urls import path

from . import views


urlpatterns = [
    path('machines/', views.StandartInfoViewSet.as_view({'get': 'list'}), name='machine_list'),
    path('machines/<int:pk>/', views.StandartInfoViewSet.as_view({'get': 'retrieve'}), name='machine_detail'),
    path('machines/full_info/', views.FullInfoMachineViewSet.as_view({'get': 'list'})),
    path('machines/full_info/<int:pk>/', views.FullInfoMachineViewSet.as_view({'get': 'retrieve'})),
    path('maintenance/', views.MaintenanceViewSet.as_view({'get': 'list'})),
    path('maintenance/<int:pk>/', views.MaintenanceViewSet.as_view({'get': 'retrieve'})),
    path('complaint/', views.ComplaintViewSet.as_view({'get': 'list'})),
    path('complaint/<int:pk>/', views.ComplaintViewSet.as_view({'get': 'retrieve'})),
]
