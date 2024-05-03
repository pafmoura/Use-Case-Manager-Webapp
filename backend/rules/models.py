from django.db import models

class RuleModel(models.Model):
    title = models.CharField(unique=False),
    useCaseId = models.IntegerField(unique=False),
    type = models.CharField(unique=False),
    syntax = models.CharField(unique=False),
    ruleCode = models.CharField(unique=False)

    def __str__(self):
        return self.title
    
class Rule(models.Model):
    rule = models.IntegerField(unique=False),
    client = models.IntegerField(unique=False),
    def __str__(self):
        return self.title