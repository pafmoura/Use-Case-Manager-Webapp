from django.urls import path
from sigmaconversions.views import convertSigmaToSplunk
from rest_framework.urlpatterns import format_suffix_patterns

from api import views

urlpatterns = [
    path('convertSigmaToSplunk', convertSigmaToSplunk, name='convertSigmaToSplunk'),

]

urlpatterns = format_suffix_patterns(urlpatterns)
