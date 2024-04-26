from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login
from django.http import JsonResponse
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.core import serializers
from django.contrib.auth import get_user_model

# Create your views here.
User = get_user_model()

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def LoggedInInfo(request):
    if request.method == 'GET':
        user = serializers.serialize('json', [request.user])
        
        return JsonResponse(user, safe=False)
    else:
        return JsonResponse({'error': 'Invalid request method'})
    

@api_view(['POST'])
def createUser(request):
    print(request.data)
    if request.method == 'POST':
        username = request.data['username']
        email = request.data['email']
        password = request.data['password']
        company = request.data.get('company')  
        if not company:
            User.objects.create_superuser(username=username, email=email, password=password)
            return JsonResponse({'success': 'Admin created successfully'})
        user = User.objects.create_user(username=username, email=email, password=password, company=company)
        user.save()
        return JsonResponse({'success': 'User created successfully'})
    else:
        return JsonResponse({'error': 'Invalid request method'})
    

@api_view(['GET'])
def getUsers(request):
    if request.method == 'GET':
        users = User.objects.all()
        user_list = serializers.serialize('json', users)
        return JsonResponse(user_list, safe=False)
    else:
        return JsonResponse({'error': 'Invalid request method'})