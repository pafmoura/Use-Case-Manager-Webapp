from django.test import TestCase

from django.conf import settings
from django.contrib.auth import authenticate, get_user_model
from rest_framework.test import APIClient
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status

# Create your tests here.
class AccessTokenTestCase(TestCase):
    
    def setUp(self) -> None:
        u = get_user_model().objects.create_user(username='user1', email='user@foo.com', password='pass1')
        u.is_active = False
        u.save()
        u = get_user_model().objects.create_user(username='user2', email='user@foo.com', password='pass2')
        u.is_active = True
        u.save()
        
        self.client = APIClient()
    
        return super().setUp()

    def test_unknown_user(self):
        response = self.client.post('/accounts/login', { "username": "user0", "password": "pass0"})
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_inactive_user(self):
        response = self.client.post('/accounts/login', { "username": "user1", "password": "pass1"})
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_active_user(self):
        response = self.client.post('/accounts/login', { "username": "user2", "password": "pass2"})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue('refresh' in response.data)
        self.assertTrue('access' in response.data)
