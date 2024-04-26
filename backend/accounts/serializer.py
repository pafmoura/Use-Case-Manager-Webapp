from rest_framework import serializers
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = '__all__'


    #object user is not json serializable

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['username'] = instance.username
        response['email'] = instance.email
        response['date_joined'] = instance.date_joined
        response['last_login'] = instance.last_login
        response['is_admin'] = instance.is_admin
        response['is_active'] = instance.is_active
        response['is_staff'] = instance.is_staff
        response['is_superuser'] = instance.is_superuser
        return response