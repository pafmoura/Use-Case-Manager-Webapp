from django.test import TestCase

from django.conf import settings
from django.contrib.auth import authenticate, get_user_model
from rest_framework.test import APIClient
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status

