from django.urls import path
from rules.views import createRegisteredLogSource, createRule, createRuleModel, deleteLogSourceById, deleteRuleModelById, getRegisteredLogSources, getRuleById, getRuleModelById, getRuleModels, getRuleModelsByUseCase, getRules, updateRuleCode, updateRuleModelCode
from rest_framework.urlpatterns import format_suffix_patterns


urlpatterns = [
    path('createRuleModel', createRuleModel, name='createRuleModel'),
    path('getRuleModels', getRuleModels, name='getRuleModels'),
    path('getRuleModelsByUseCase/<int:useCaseId>', getRuleModelsByUseCase, name='getRuleModelsByUseCase'),
    path('getRuleModelById/<int:id>', getRuleModelById, name='getRuleModelById'),
    path('deleteRuleModelById/<int:id>', deleteRuleModelById, name='deleteRuleModelById'),
    path('createRule',createRule, name="createRule"),
    path('getRules', getRules, name='getRules'),
    path('getRuleById/<int:id>', getRuleById, name='getRuleById'),
    path('createRegisteredLogSource', createRegisteredLogSource, name='createRegisteredLogSource'),
    path('getRegisteredLogSources', getRegisteredLogSources, name='getRegisteredLogSources'),
    path('deleteLogSourceById/<int:id>',deleteLogSourceById, name='deleteLogSourceById'),
    path('updateRuleModelCode/<int:id>', updateRuleModelCode, name='updateRuleModelCode'),
    path('updateRuleCode/<int:id>', updateRuleCode, name='updateRuleCode'),

]

# urlpatterns = format_suffix_patterns(urlpatterns)
