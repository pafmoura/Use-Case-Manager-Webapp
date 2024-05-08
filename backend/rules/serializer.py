from rules.models import RuleModel
from rest_framework import serializers
from usecases.models import UseCase
from rest_framework import serializers
from usecases.models import UseCase


class RuleModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = RuleModel
        fields = '__all__'


        
