from rest_framework.test import APITestCase
from rest_framework import status
from rest_framework.authtoken.models import Token
from django.contrib.auth import get_user_model
from django.urls import reverse
from news.models import BookMarkNews

User = get_user_model()


class TestBookMarkNewsCreateEndpint(APITestCase):
    create_book_mark_url = reverse('news:book-mark-news-list')

    def setUp(self):
        self.user = User.objects.create_user(email='test@email.com',
                                             password="password")
        BookMarkNews.objects.create(
            title='test', url='http://www.same.com', user=self.user)
        self.token = Token.objects.create(user=self.user)
        self.client.credentials(HTTP_AUTHORIZATION="Token " + self.token.key)

    def test_create_success_with_valid_data(self):
        data = {
            'title': 'Test Book Mark',
            'url': 'http://www.xyz.com'
        }
        response = self.client.post(self.create_book_mark_url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_create_failed_without_authenticated_user(self):
        self.client.force_authenticate(user=None)
        data = {
            'title': 'Test Book Mark',
            'url': 'http://www.xyz.com'
        }
        response = self.client.post(self.create_book_mark_url, data)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_create_failed_for_invalid_url(self):
        data = {
            'title': 'Test Book Mark',
            'url': 'www.xyz'
        }
        response = self.client.post(self.create_book_mark_url, data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_same_user_cant_create_with_same_url_bookmark_multiple_time(self):
        data = {
            'title': 'Test Book Mark',
            'url': 'http://www.same.com'
        }
        response = self.client.post(self.create_book_mark_url, data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
