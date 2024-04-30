from django.db import models
from django.contrib.postgres.fields import ArrayField

# Create your models here.

class UseCase(models.Model):
    mid = models.CharField(max_length=100, blank=True, null=True)
    title = models.CharField(max_length=100)
    cncs = models.CharField(max_length=100, blank=True, null=True)
    tactics = ArrayField(models.CharField( blank=True, null=True),blank=True, null=True)
    description = models.CharField(max_length=3000, blank=True, null=True)
    mitigations = ArrayField(models.CharField( blank=True, null=True), blank=True, null=True)
    components = ArrayField(models.CharField( blank=True, null=True),blank=True, null=True)
    datasources = ArrayField(models.CharField( blank=True, null=True),blank=True, null=True)
    #apaguei o  detections

    def __str__(self):
        return self.name
