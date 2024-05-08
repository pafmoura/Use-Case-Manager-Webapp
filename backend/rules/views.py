from django.shortcuts import render

# Create your views here.

from rules.serializer import RuleModelSerializer
from rules.models import RuleModel
from rest_framework import viewsets
from django.http import JsonResponse
from rest_framework.decorators import api_view

@api_view(['POST'])
def createRuleModel(request):
    if request.method == 'POST':
        data = request.data
        new_rule = RuleModel(title=data['title'], useCaseId=data['useCaseId'], type=data['type'], syntax=data['syntax'], ruleCode=data['ruleCode'])
        new_rule.save()
        return JsonResponse(data, safe=False)
    else:
        return JsonResponse({'error': 'Invalid request method'})
    

@api_view(['GET'])
def getRuleModels(request):
    if request.method == 'GET':
        rules = RuleModel.objects.all()
        serializer = RuleModelSerializer(rules, many=True)
        return JsonResponse(serializer.data, safe=False)

    else:
        return JsonResponse({'error': 'Invalid request method'})


@api_view(['GET'])
def getRuleModelsByUseCase(request, useCaseId):
    if request.method == 'GET':
        rules = RuleModel.objects.filter(useCaseId=useCaseId)
        serializer = RuleModelSerializer(rules, many=True)
        return JsonResponse(serializer.data, safe=False)

    else:
        return JsonResponse({'error': 'Invalid request method'})