from rest_framework.test import APITestCase
from rest_framework import status
from rest_framework.authtoken.models import Token
from django.contrib.auth import get_user_model
from django.urls import reverse

User = get_user_model()


class TestUserTokenCreate(APITestCase):
    login_url = reverse('auths:login')

    def setUp(self):
        self.user = User.objects.create_user(
            email='test@email.com', password="password")

    def test_login_success_with_valid_credentials(self):
        data = {'email': self.user.email, 'password': 'password'}
        response = self.client.post(self.login_url, data=data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_login_failed_with_invalid_credentials(self):
        data = {'email': self.user.email, 'password': 'passwordxyz'}
        response = self.client.post(self.login_url, data=data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


class TestUserTokenDestroy(APITestCase):
    logout_url = reverse('auths:logout')

    def setUp(self):
        self.user = User.objects.create_user(email='test@email.com',
                                             password="password")
        self.token = Token.objects.create(user=self.user)
        self.client.credentials(HTTP_AUTHORIZATION="Token " + self.token.key)

    def test_logout_success_with_token(self):
        response = self.client.post(self.logout_url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_logout_failed_without_token(self):
        self.client.force_authenticate(user=None)
        response = self.client.post(self.logout_url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
