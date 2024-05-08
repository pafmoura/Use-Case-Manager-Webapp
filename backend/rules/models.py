from django.db import models

class RuleModel(models.Model):
    title = models.CharField(unique=False, null=True)
    useCaseId = models.IntegerField(unique=False, null=True)
    type = models.CharField(unique=False, null=True)
    syntax = models.CharField(unique=False, null=True)
    ruleCode = models.CharField(unique=False, null=True)

    def __str__(self):
        return self.title
    
