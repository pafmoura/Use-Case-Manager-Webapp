from usecases.views import createUseCase, deleteUseCase, getComponentsByTechniqueId, getDataSourcesByTechniqueId, getMitigationsByTechniqueId, getTechniqueById, getUseCaseById, getUseCases, updatePhaseTasks, updateUseCase
from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

from api import views


urlpatterns = [
    path('getTechniqueById/<str:id>', getTechniqueById, name='getTechniqueById'),
    path('createUseCase', createUseCase, name='createUseCase'),
    path('getMitigationsByTechniqueId/<str:id>',getMitigationsByTechniqueId, name='getMitigationsByTechniqueId'),
    path('getDataSourcesByTechniqueId/<str:id>', getDataSourcesByTechniqueId, name='getDataSourcesByTechniqueId'),
    path('getComponentsByTechniqueId/<str:id>', getComponentsByTechniqueId, name='getComponentsByTechniqueId'),
    path('getUseCases', getUseCases, name='getUseCases'),
    path('deleteUseCase/<str:id>', deleteUseCase, name='deleteUseCase'),
    path('getUseCaseById/<int:id>', getUseCaseById, name='getUseCaseById'),
    path('updatePhaseTasks/<int:id>', updatePhaseTasks, name='updatePhaseTasks'),
    path('updateUseCase/<int:id>', updateUseCase, name='updateUseCase')
]