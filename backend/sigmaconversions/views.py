import json
from django.shortcuts import render
from sigma.conversion.base import Backend
from sigma.plugins import InstalledSigmaPlugins
from sigma.collection import SigmaCollection
from sigma.exceptions import SigmaError
from sigma.processing import pipeline
from sigma.processing.pipeline import ProcessingPipeline
from sigma.backends.splunk import SplunkBackend
from django.http import JsonResponse
from rest_framework.decorators import api_view
from sigma.backends.QRadarAQL import QRadarAQLBackend
from sigma.backends.elasticsearch.elasticsearch_lucene import LuceneBackend


@api_view(['POST'])
def convertSigmaToSplunk(request):
    print(request.data['rule'])
    rule = request.data['rule']
    backend = SplunkBackend()
    rules = SigmaCollection.from_yaml(rule)

    return JsonResponse( backend.convert(rules) , safe=False)

@api_view(['POST'])
def convertSigmaToQRadar(request):
    print(request.data['rule'])
    rule = request.data['rule']
    backend = QRadarAQLBackend()
    rules = SigmaCollection.from_yaml(rule)

    return JsonResponse( backend.convert(rules) , safe=False)


@api_view(['POST'])
def convertSigmaToElasticLucena(request):
    print(request.data['rule'])
    rule = request.data['rule']
    backend = LuceneBackend()
    rules = SigmaCollection.from_yaml(rule)

    return JsonResponse( backend.convert(rules) , safe=False)


@api_view(['POST'])
def convertSigma(request):
    print(request.data['backend'])
    rule = request.data['rule']
    backend = request.data['backend']
    if backend == 'Splunk Rule':
        backend = SplunkBackend()
    elif backend == 'QRadar Rule':
        backend = QRadarAQLBackend()
    elif backend == 'Elastic Rule':
        backend = LuceneBackend()
    else:
        return JsonResponse(request.data['rule'], safe=False)
    rules = SigmaCollection.from_yaml(rule)

    return JsonResponse( backend.convert(rules) , safe=False)