from django.urls import path
from rules.views import createRule, createRuleModel, deleteRuleModelById, getRuleById, getRuleModelById, getRuleModels, getRuleModelsByUseCase, getRules
from rest_framework.urlpatterns import format_suffix_patterns

from api import views

urlpatterns = [
    path('createRuleModel', createRuleModel, name='createRuleModel'),
    path('getRuleModels', getRuleModels, name='getRuleModels'),
    path('getRuleModelsByUseCase/<int:useCaseId>', getRuleModelsByUseCase, name='getRuleModelsByUseCase'),
    path('getRuleModelById/<int:id>', getRuleModelById, name='getRuleModelById'),
    path('deleteRuleModelById/<int:id>', deleteRuleModelById, name='deleteRuleModelById'),
    path('createRule',createRule, name="createRule"),
    path('getRules', getRules, name='getRules'),
    path('getRuleById/<int:id>', getRuleById, name='getRuleById'),

]

# urlpatterns = format_suffix_patterns(urlpatterns)
