from usecases.views import createUseCase, getComponentsByTechniqueId, getDataSourcesByTechniqueId, getMitigationsByTechniqueId, getTechniqueById
from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

from api import views


urlpatterns = [
    path('getTechniqueById/<str:id>', getTechniqueById, name='getTechniqueById'),
    path('createUseCase', createUseCase, name='createUseCase'),
    path('getMitigationsByTechniqueId/<str:id>',getMitigationsByTechniqueId, name='getMitigationsByTechniqueId'),
    path('getDataSourcesByTechniqueId/<str:id>', getDataSourcesByTechniqueId, name='getDataSourcesByTechniqueId'),
    path('getComponentsByTechniqueId/<str:id>', getComponentsByTechniqueId, name='getComponentsByTechniqueId'),
]