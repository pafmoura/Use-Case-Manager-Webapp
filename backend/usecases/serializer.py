from rest_framework import serializers
from usecases.models import UseCase
from rest_framework import serializers
from usecases.models import UseCase


class UseCaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = UseCase
        fields = '__all__'


        
