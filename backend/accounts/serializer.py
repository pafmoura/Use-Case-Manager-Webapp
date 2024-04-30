from rest_framework import serializers
from accounts.models import Company, User 


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['pk', 'password', 'email', 'username', 'date_joined', 'last_login', 'is_admin', 'is_active', 'is_staff', 'is_superuser', 'company']

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['pk'] = instance.pk
        response['username'] = instance.username
        response['email'] = instance.email
        response['date_joined'] = instance.date_joined
        response['last_login'] = instance.last_login
        response['is_admin'] = instance.is_admin
        response['is_active'] = instance.is_active
        response['is_staff'] = instance.is_staff
        response['is_superuser'] = instance.is_superuser
        return response
    

class CompanySerializer(serializers.ModelSerializer):

    class Meta:
        model = Company
        fields = ['pk', 'name', 'date']

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['pk'] = instance.pk
        response['name'] = instance.name
        response['date'] = instance.date
        return response
