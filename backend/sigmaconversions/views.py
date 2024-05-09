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


@api_view(['POST'])
def convertSigmaToSplunk(request):
    print(request.data['rule'])
    rule = request.data['rule']
    backend = SplunkBackend()
    rules = SigmaCollection.from_yaml(rule)

    return JsonResponse( backend.convert(rules) , safe=False)
