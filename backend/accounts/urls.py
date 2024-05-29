from email.mime.text import MIMEText
from django.contrib import admin
from django.urls import path
from accounts.views import LoggedInInfo, createCompany, createUser, deleteCompany, deleteUser, getCompanies, getLogsourcesByClient, getUsers, updateUserInfo
from accounts.mailtemplate import otpEmailMessage
from config import settings
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth import authenticate
from rest_framework import serializers
from rest_framework.views import APIView
from django.utils import timezone
from datetime import timedelta
from django.core.mail import send_mail
from django.core.mail import EmailMultiAlternatives

from .models import User  # import your custom user model

class CustomTokenObtainPairSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()

    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')
        user = authenticate(email=email, password=password)
        if user is None or not user.is_active:
            raise serializers.ValidationError('Invalid credentials')
        user.generate_otp()
        subject = 'Código de Verificação - RedUCM'
        message = f'O seu código de verificação é: {user.otp}'
        html_content = otpEmailMessage(user.otp)
        email_from = settings.EMAIL_HOST_USER
        recipient_list = [user.email]
            
        msg = EmailMultiAlternatives(subject, message, email_from, recipient_list)
        msg.attach_alternative(html_content, "text/html")
            
        msg.send()
        
        return {
                    'user': user,
                    'email': user.email,
                    'otp_sent': True,
                }

class VerifyOTPSerializer(serializers.Serializer):
    email = serializers.EmailField()
    otp = serializers.CharField(max_length=6)


class VerifyOTPView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = VerifyOTPSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = serializer.validated_data['email']
        otp = serializer.validated_data['otp']
        try:
            user = User.objects.get(email=email, otp=otp)
            if timezone.now() > user.otp_time + timedelta(minutes=5):
                raise serializers.ValidationError('OTP expired')
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'otp_sent': 'OTP verified successfully',
            })
        except User.DoesNotExist:
            return Response({'detail': 'Invalid OTP'}, status=status.HTTP_400_BAD_REQUEST)


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
            'otp_sent': serializer.validated_data['otp_sent'],
        }, status=status.HTTP_200_OK)
    

urlpatterns = [
    path('login', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('verify-otp', VerifyOTPView.as_view(), name='verify_otp'),
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