from django.shortcuts import render

# Create your views here.

from accounts.models import Company
from rules.serializer import RuleModelSerializer, RuleSerializer
from rules.models import Rule, RuleModel
from rest_framework import viewsets
from django.http import JsonResponse
from rest_framework.decorators import api_view

@api_view(['POST'])
def createRuleModel(request):
    if request.method == 'POST':
        data = request.data
        new_rule = RuleModel(title=data['title'], useCaseId=data['useCaseId'], logsources=data['logsources'], type=data['type'], syntax=data['syntax'], ruleCode=data['ruleCode'])
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
    
@api_view(['GET'])
def getRuleModelById(request, id):
    if request.method == 'GET':
        rule = RuleModel.objects.get(id=id)
        serializer = RuleModelSerializer(rule, many=False)
        return JsonResponse(serializer.data, safe=False)

    else:
        return JsonResponse({'error': 'Invalid request method'})
    
@api_view(['POST'])
def deleteRuleModelById(request, id):
    if request.method == 'POST':
        rule = RuleModel.objects.get(id=id)
        rule.delete()
        return JsonResponse({'message': 'Rule deleted successfully'})
    else:
        return JsonResponse({'error': 'Invalid request method'})
    

@api_view(['POST'])
def createRule(request):
    if request.method == 'POST':
        data = request.data
        ruleModel = RuleModel.objects.get(id=data['ruleModel'])
        client = Company.objects.get(id=data['client'])
        new_rule = Rule(ruleModel=ruleModel, logsources=data['logsources'], ruleCode=data['ruleCode'], client=client)
        new_rule.save()
        return JsonResponse(data, safe=False)

@api_view(['GET'])
def getRules(request):
    if request.method == 'GET':
        rules = Rule.objects.all()
        serializer = RuleSerializer(rules, many=True)
        return JsonResponse(serializer.data, safe=False)

    else:
        return JsonResponse({'error': 'Invalid request method'})
    
@api_view(['GET'])
def getRuleById(request, id):
    if request.method == 'GET':
        rule = Rule.objects.get(id=id)
        serializer = RuleSerializer(rule, many=False)
        return JsonResponse(serializer.data, safe=False)

    else:
        return JsonResponse({'error': 'Invalid request method'})