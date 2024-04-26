from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

from api import views

urlpatterns = [
    path("data", views.DataViewer.as_view()),
    path("xml", views.XmlViewer.as_view()),
    path("xml2json", views.Xml2JsonViewer.as_view()),
    path("async", views.AsyncView.as_view()),
    path("template/<str:tpl_name>", views.GetTemplateView.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)
