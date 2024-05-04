from django.shortcuts import render

# Create your views here.

from backend.rules.models import RuleModel
from rest_framework import viewsets
from django.http import JsonResponse
from rest_framework.decorators import api_view

@api_view(['POST'])
def createRuleModel(request):
    if request.method == 'POST':
        data = request.data
        new_usecase = RuleModel(title=data['title'], useCaseId=data['useCaseId'], type=data['type'], syntax=data['syntax'], ruleCode=data['ruleCode'])
        new_usecase.save()
        return JsonResponse(data, safe=False)
    else:
        return JsonResponse({'error': 'Invalid request method'})
