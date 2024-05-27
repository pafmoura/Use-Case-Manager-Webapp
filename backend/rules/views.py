from django.shortcuts import render

# Create your views here.

from accounts.models import Company
from rules.serializer import RegisteredLogSourceSerializer, RuleModelSerializer, RuleSerializer
from rules.models import RegisteredLogSource, Rule, RuleModel
from rest_framework import viewsets
from django.http import JsonResponse
from rest_framework.decorators import api_view
from drf_spectacular.utils import extend_schema
from drf_spectacular.utils import OpenApiResponse
from rest_framework import status



@extend_schema(request=RuleModelSerializer,
               description='RuleModel creation based on the data inserted in the request body.',
               responses={
                   200: OpenApiResponse(response=RuleModelSerializer, description='RuleModel created successfully'),
                   400: OpenApiResponse(response=None, description='Invalid request method')
               })
@api_view(['POST'])
def createRuleModel(request):
    if request.method == 'POST':
        data = request.data
        new_rule = RuleModel(title=data['title'], useCaseId=data['useCaseId'], logsources=data['logsources'], type=data['type'], ruleCode=data['ruleCode'])
        new_rule.save()
        return JsonResponse(data, safe=False)
    else:
        return JsonResponse({'error': 'Invalid request method'})
    

@extend_schema(request=RuleModelSerializer,
               description='RuleModel update based on the data inserted in the request body.',
               responses={
                   200: OpenApiResponse(response=RuleModelSerializer, description='get Rule Models successfully'),
                   400: OpenApiResponse(response=None, description='Invalid request method')
               })
@api_view(['GET'])
def getRuleModels(request):
    if request.method == 'GET':
        rules = RuleModel.objects.all()
        serializer = RuleModelSerializer(rules, many=True)
        return JsonResponse(serializer.data, safe=False)

    else:
        return JsonResponse({'error': 'Invalid request method'})


@extend_schema(request=RuleModelSerializer,
                description='Get RuleModel based on Use Case Id.',
                responses={
                     200: OpenApiResponse(response=RuleModelSerializer, description='RuleModel retrieved successfully'),
                     400: OpenApiResponse(response=None, description='Invalid request method')
                })
@api_view(['GET'])
def getRuleModelsByUseCase(request, useCaseId):
    if request.method == 'GET':
        rules = RuleModel.objects.filter(useCaseId=useCaseId)
        serializer = RuleModelSerializer(rules, many=True)
        return JsonResponse(serializer.data, safe=False)

    else:
        return JsonResponse({'error': 'Invalid request method'})
    
@extend_schema(request=RuleModelSerializer,
                description='Get rulemodel based on ID.',
                responses={
                     200: OpenApiResponse(response=RuleModelSerializer, description='RUleModel retrieved successfully'),
                     400: OpenApiResponse(response=None, description='Invalid request method')
                })
@api_view(['GET'])
def getRuleModelById(request, id):
    if request.method == 'GET':
        rule = RuleModel.objects.get(id=id)
        serializer = RuleModelSerializer(rule, many=False)
        return JsonResponse(serializer.data, safe=False)

    else:
        return JsonResponse({'error': 'Invalid request method'})
    

@extend_schema(request=RuleModelSerializer,
                description='Delete RuleModel based on ID.',
                responses={
                     200: OpenApiResponse(response=RuleModelSerializer, description='RuleModel deleted successfully'),
                     400: OpenApiResponse(response=None, description='Invalid request method')
                })
@api_view(['POST'])
def deleteRuleModelById(request, id):
    if request.method == 'POST':
        rule = RuleModel.objects.get(id=id)
        rule.delete()
        return JsonResponse({'message': 'Rule deleted successfully'})
    else:
        return JsonResponse({'error': 'Invalid request method'})
    

@extend_schema(request=RuleSerializer,
                description='Rule creation based on the data inserted in the request body.',
                responses={
                     200: OpenApiResponse(response=RuleSerializer, description='Rule created successfully'),
                     400: OpenApiResponse(response=None, description='Invalid request method')
                })
@api_view(['POST'])
def createRule(request):
    if request.method == 'POST':
        data = request.data
        ruleModel = RuleModel.objects.get(id=data['ruleModel'])
        client = Company.objects.get(id=data['client'])
        new_rule = Rule(ruleModel=ruleModel, logsources=data['logsources'], ruleCode=data['ruleCode'], syntax=data['syntax'], client=client)
        new_rule.save()
        return JsonResponse(data, safe=False)


@extend_schema(request=RuleSerializer,
                description='Get all rules.',
                responses={
                     200: OpenApiResponse(response=RuleSerializer, description='Rules retrieved successfully'),
                     400: OpenApiResponse(response=None, description='Invalid request method')
                })
@api_view(['GET'])
def getRules(request):
    if request.method == 'GET':
        rules = Rule.objects.all()
        serializer = RuleSerializer(rules, many=True)
        return JsonResponse(serializer.data, safe=False)

    else:
        return JsonResponse({'error': 'Invalid request method'})
    
@extend_schema(request=RuleSerializer,
                description='Get rules based on ID.',
                responses={
                     200: OpenApiResponse(response=RuleSerializer, description='Rules retrieved successfully'),
                     400: OpenApiResponse(response=None, description='Invalid request method')
                })
@api_view(['GET'])
def getRuleById(request, id):
    if request.method == 'GET':
        rule = Rule.objects.get(id=id)
        serializer = RuleSerializer(rule, many=False)
        return JsonResponse(serializer.data, safe=False)

    else:
        return JsonResponse({'error': 'Invalid request method'})
    

@api_view(['POST'])
def createRegisteredLogSource(request):
    if request.method == 'POST':
        data = request.data
        new_logsource = RegisteredLogSource(name=data['name'], description=data['description'])

        #check if exists
        logsource = RegisteredLogSource.objects.filter(name=data['name'])
        if logsource:
            return JsonResponse({'error': 'A logsource já existe'}, status=status.HTTP_400_BAD_REQUEST)
        

        new_logsource.save()
        return JsonResponse(data, safe=False)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET'])
def getRegisteredLogSources(request):
    if request.method == 'GET':
        logsources = RegisteredLogSource.objects.all()
        serializer = RegisteredLogSourceSerializer(logsources, many=True)
        return JsonResponse(serializer.data, safe=False)

    else:
        return JsonResponse({'error': 'Invalid request method'})
    
@api_view(['POST'])
def deleteLogSourceById(request, id):
    if request.method == 'POST':
        logsource = RegisteredLogSource.objects.get(id=id)
        logsource.delete()
        return JsonResponse({'message': 'LogSource deleted successfully'})
    else:
        return JsonResponse({'error': 'Invalid request method'})
    

@api_view(['POST'])
def updateRuleModelCode(request,id):
    if request.method == 'POST':
        rule = RuleModel.objects.get(id=id)
        rule.ruleCode = request.data['ruleCode']
        rule.save()
        return JsonResponse({'message': 'Regra Atualizada com Sucesso'})
    else:
        return JsonResponse({'error': 'Invalid request method'})
    

@api_view(['POST'])
def updateRuleCode(request,id):
    if request.method == 'POST':
        rule = Rule.objects.get(id=id)
        rule.ruleCode = request.data['ruleCode']
        rule.save()
        return JsonResponse({'message': 'Regra Atualizada com Sucesso'})
    else:
        return JsonResponse({'error': 'Invalid request method'})