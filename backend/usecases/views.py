from django.shortcuts import render

from usecases.models import UseCase
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework import status
from rest_framework import permissions

import enterpriseattack
from rest_framework.decorators import api_view
from django.http import JsonResponse

attack = enterpriseattack.Attack()


@api_view(['GET'])
def getTechniqueById(request, id):
    if request.method == 'GET':

        for technique in attack.techniques:
            if technique.id == id:
                selected_technique = technique
        return JsonResponse(selected_technique.to_json(), safe=False)
    else:
        return JsonResponse({'error': 'Invalid request method'})
    
@api_view(['POST'])
def createUseCase(request):
    if request.method == 'POST':
        data = request.data
        new_usecase = UseCase(mid=data['mid'], title=data['title'], cncs=data['cncs'], tactics=data['tactics'], description=data['description'], mitigations=data['mitigations'], components=data['components'], datasources=data['datasources'])
        new_usecase.save()
        return JsonResponse(data, safe=False)
    else:
        return JsonResponse({'error': 'Invalid request method'})
    

@api_view(['GET'])
def getMitigationsByTechniqueId(request, id):


    techniques = attack.techniques
    selected_technique = attack.techniques[1]

    for tech in techniques:
        if tech.id == id:
            selected_technique = tech


    mitigations = attack.mitigations

    print(selected_technique.name)

    Mitigations = []

    for mit in mitigations:
        for technique in mit.techniques:
         if selected_technique.name == technique.name:
             Mitigations.append(mit.to_json())
             
             
            
    return JsonResponse(Mitigations, safe=False)


def getDataSourcesByTechniqueId(request, id):
    techniques = attack.techniques
    selected_technique = attack.techniques[1]

    datasources = attack.data_sources


    techniqueDatasources = []


    for tech in techniques:
        if tech.id == id:
            selected_technique = tech
            print(selected_technique.datasources)
            for techds in selected_technique.datasources:
                for ds in datasources:
                    if techds.name == ds.name:
                        techniqueDatasources.append(ds.to_json())

    return JsonResponse(techniqueDatasources, safe=False)

def getComponentsByTechniqueId(request, id):
    techniques = attack.techniques
    selected_technique = attack.techniques[1]

    datasources = attack.components


    techniqueDatasources = []


    for tech in techniques:
        if tech.id == id:
            selected_technique = tech
            for techds in selected_technique.components:
                for ds in datasources:
                    if techds.name == ds.name:
                        techniqueDatasources.append(ds.to_json())

    return JsonResponse(techniqueDatasources, safe=False)

