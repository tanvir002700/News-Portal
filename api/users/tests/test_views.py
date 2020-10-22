from rest_framework.test import APITestCase
from rest_framework import status
from rest_framework.authtoken.models import Token
from django.contrib.auth import get_user_model
from django.urls import reverse

User = get_user_model()


class TestUserMeEndPoint(APITestCase):
    me_url = reverse('users:users-me')

    def setUp(self):
        self.user = User.objects.create_user(email='test@email.com',
                                             password="password")
        self.token = Token.objects.create(user=self.user)
        self.client.credentials(HTTP_AUTHORIZATION="Token " + self.token.key)

    def test_me_success_with_logged_in_user(self):
        response = self.client.get(self.me_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['email'], self.user.email)

    def test_me_forbidden_without_logged_in_user(self):
        self.client.force_authenticate(user=None)
        response = self.client.get(self.me_url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)


class TestUserRegistrationEndpoint(APITestCase):
    registration_url = reverse('users:users-list')

    def setUp(self):
        self.user = User.objects.create_user(email='test@email.com',
                                             password="password")

    def test_registration_success_with_valid_data(self):
        data = {
            'email': 'test2@email.com',
            'password': 'password-super',
            're_password': 'password-super'
        }
        response = self.client.post(self.registration_url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_registration_failed_without_re_password(self):
        data = {
            'email': 'test2@email.com',
            'password': 'password-super',
        }
        response = self.client.post(self.registration_url, data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_registration_failed_with_worng_re_password(self):
        data = {
            'email': 'test2@email.com',
            'password': 'password-super',
            're_password': 'password'
        }
        response = self.client.post(self.registration_url, data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_registration_failed_with_existing_email(self):
        data = {
            'email': 'test@email.com',
            'password': 'password-super',
            're_password': 'password-super'
        }
        response = self.client.post(self.registration_url, data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['email'][0],
                         'user with this email address already exists.')
