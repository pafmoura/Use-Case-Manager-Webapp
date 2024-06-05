import json
import os
from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from .models import UseCase
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "mysite.settings")


class UseCaseTests(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_create_usecase(self):
        url = reverse('createUseCase')


        data = {
            'title': 'Test Use Case',
            'description': 'This is a test use case',
            'mitigation': 'Test mitigation',
            'playbook': 'Test playbook',
            'cncsClass': 'Test CNCs Class',
            'cncsType': 'Test CNCs Type',
        }


        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)



    def test_get_usecases(self):
        url = reverse('getUseCases')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def deleteUseCase(self):
        url = reverse('deleteUseCase', args=[1])
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def getMitigationsByTechniqueId(self):
        url = reverse('getMitigationsByTechniqueId', args=['1638'])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def getDataSourcesByTechniqueId(self):
        url = reverse('getDataSourcesByTechniqueId', args=['1638'])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def getComponentsByTechniqueId(self):
        url = reverse('getComponentsByTechniqueId', args=['1638'])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def getTechniqueById(self):
        url = reverse('getTechniqueById', args=['1638'])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
