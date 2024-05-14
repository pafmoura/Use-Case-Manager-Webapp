from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login
from django.http import JsonResponse
from accounts.models import Company, User  # Alterado para importar User de accounts.models
from accounts.serializer import CompanySerializer, UserSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth import get_user_model
from django.core import serializers

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
        companies = request.data.get('companies')  
        if not companies:
            User.objects.create_superuser(username=username, email=email, password=password)
            return JsonResponse({'success': 'Admin created successfully'})
        user = User.objects.create_user(username=username, email=email, password=password, companies=companies)
        user.save()
        return JsonResponse({'success': 'User created successfully'})
    else:
        return JsonResponse({'error': 'Invalid request method'})
    

@api_view(['GET'])
def getUsers(request):
    if request.method == 'GET':
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        user_list = serializers.serialize('json', users, indent=2)
        
        return JsonResponse(serializer.data, safe=False)
    else:
        return JsonResponse({'error': 'Invalid request method'})
    

@api_view(['GET'])
def getCompanies(request):
    if request.method == 'GET':
        companies = Company.objects.all()
        serializer = CompanySerializer(companies, many=True)
        return JsonResponse(serializer.data, safe=False)
    else:
        return JsonResponse({'error': 'Invalid request method'})
    
@api_view(['POST'])
def createCompany(request):
    if request.method == 'POST':

        name = request.data['name']
        logsources = request.data['logsources']
        company = Company(name=name, logsources=logsources)
        company.save()
        return JsonResponse({'success': 'Company created successfully'})
    else:
        return JsonResponse({'error': 'Invalid request method'})
    
@api_view(['POST'])
def deleteUser(request, id):
    user = User.objects.get(id=id)
    user.delete()
    return JsonResponse({'success': 'User deleted successfully'})

@api_view(['POST'])
def deleteCompany(request, id):
    company = Company.objects.get(id=id)
    company.delete()
    return JsonResponse({'success': 'Company deleted successfully'})

@api_view(['GET'])
def getLogsourcesByClient(request, clientName):
    company = Company.objects.get(name=clientName)
    return JsonResponse({'logsources': company.logsources})