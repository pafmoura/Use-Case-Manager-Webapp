from django.contrib import admin
from django.urls import path
from accounts.views import LoggedInInfo, createCompany, createUser, deleteCompany, deleteUser, getCompanies, getLogsourcesByClient, getUsers, updateUserInfo
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth import authenticate
from rest_framework import serializers

from .models import User  # import your custom user model


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        if 'email' not in attrs or 'password' not in attrs:
            raise serializers.ValidationError('Username and password are required')
        data = super().validate(attrs)
        user = authenticate(username=attrs['email'], password=attrs['password'])
        if user is not None and user.is_active:
            data['user'] = user
        else:
            raise serializers.ValidationError('Invalid credentials')
        return data

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer
    @classmethod
    def get_token(cls, user):
        return RefreshToken.for_user(user)

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token = self.get_token(user)

        return Response({
            'refresh': str(token),
            'access': str(token.access_token),
        }, status=status.HTTP_200_OK)
    

urlpatterns = [
    path('login', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('refresh', TokenRefreshView.as_view(), name='token_refresh'),
    path('loggedInInfo', LoggedInInfo, name='loggedInInfo'),
    path('createUser', createUser, name='createUser'),
    path('getUsers', getUsers, name='getUsers'),
    path('createCompany', createCompany, name='createCompany'),
    path('getCompanies', getCompanies, name='getCompanies'),
    path('deleteUser/<str:id>', deleteUser, name='deleteUser'),
    path('deleteCompany/<str:id>', deleteCompany, name='deleteCompany'),
    path('getLogsourcesByClient/<str:clientName>', getLogsourcesByClient, name='getLogsourcesByClient'),
    path('updateUserInfo/<str:id>', updateUserInfo, name='updateUserInfo')
]