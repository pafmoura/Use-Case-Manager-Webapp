from django.urls import path
from rules.views import createRuleModel, deleteRuleModelById, getRuleModelById, getRuleModels, getRuleModelsByUseCase
from rest_framework.urlpatterns import format_suffix_patterns

from api import views

urlpatterns = [
    path('createRuleModel', createRuleModel, name='createRuleModel'),
    path('getRuleModels', getRuleModels, name='getRuleModels'),
    path('getRuleModelsByUseCase/<int:useCaseId>', getRuleModelsByUseCase, name='getRuleModelsByUseCase'),
    path('getRuleModelById/<int:id>', getRuleModelById, name='getRuleModelById'),
    path('deleteRuleModelById/<int:id>', deleteRuleModelById, name='deleteRuleModelById')

]

urlpatterns = format_suffix_patterns(urlpatterns)
