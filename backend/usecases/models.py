from django.db import models
from django.contrib.postgres.fields import ArrayField

# Create your models here.


class UseCase(models.Model):
    title = models.CharField(max_length=1000)
    cncsClass = models.CharField(max_length=1000, blank=True, null=True)
    cncsType = models.CharField(max_length=1000, blank=True, null=True)
    description = models.CharField(max_length=1000000, blank=True, null=True)
    mitigation = models.CharField(max_length=1000000, blank=True, null=True)
    mitreTechniques = ArrayField(models.CharField( blank=True, null=True),blank=True, null=True)
    phaseTasks = ArrayField(models.JSONField(blank=True, null=True), blank=True, null=True)
    rules = ArrayField(models.JSONField(blank=True, null=True), blank=True, null=True)
    attackVectors = ArrayField(models.CharField( blank=True, null=True),blank=True, null=True)
    playbook = models.CharField(max_length=1000, blank=True, null=True)


#class UseCase(models.Model):
 #   title = models.CharField()
 #   description = models.CharField(blank=True, null=True)
  #  mitigation = models.CharField(blank=True, null=True)
 #   playbook = models.BinaryField(blank=True)
 #   mitreTechniques = ArrayField(models.CharField(blank=True, null=True), blank=True, null=True)
 ##   cncsClass = models.CharField(blank=True, null=True)
  #  cncsType = models.CharField(blank=True, null=True)
  #  PhaseTasks = ArrayField(models.JSONField(blank=True, null=True), blank=True, null=True)

#



    #apaguei o  detections

    def __str__(self):
        return self.name
