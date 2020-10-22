from django.test import SimpleTestCase
from django.urls import reverse, resolve
from users import views


class TestUrls(SimpleTestCase):
    def test_me_url_is_resolved(self):
        url = reverse('users:users-me')
        self.assertEqual(resolve(url).func.cls, views.UserViewSet)
