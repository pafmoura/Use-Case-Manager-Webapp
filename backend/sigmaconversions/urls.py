from django.urls import path
from sigmaconversions.views import convertSigmaToElasticLucena, convertSigmaToQRadar, convertSigmaToSplunk
from rest_framework.urlpatterns import format_suffix_patterns

from api import views

urlpatterns = [
    path('convertSigmaToSplunk', convertSigmaToSplunk, name='convertSigmaToSplunk'),
    path('convertSigmaToQRadar', convertSigmaToQRadar, name='convertSigmaToQRadar'),
    path('convertSigmaToElasticLucena', convertSigmaToElasticLucena, name='convertSigmaToElasticLucena'),

]

urlpatterns = format_suffix_patterns(urlpatterns)
