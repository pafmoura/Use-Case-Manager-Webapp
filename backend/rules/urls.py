from django.urls import path
from rules.views import createRuleModel, getRuleModels, getRuleModelsByUseCase
from rest_framework.urlpatterns import format_suffix_patterns

from api import views

urlpatterns = [
    path('createRuleModel', createRuleModel, name='createRuleModel'),
    path('getRuleModels', getRuleModels, name='getRuleModels'),
    path('getRuleModelsByUseCase/<int:useCaseId>', getRuleModelsByUseCase, name='getRuleModelsByUseCase'),

]

urlpatterns = format_suffix_patterns(urlpatterns)
