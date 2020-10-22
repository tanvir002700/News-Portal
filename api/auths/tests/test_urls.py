from django.test import SimpleTestCase
from django.urls import reverse, resolve
from auths import views


class TestUrls(SimpleTestCase):
    def test_login_url_is_resolved(self):
        url = reverse('auths:login')
        self.assertEqual(resolve(url).func.view_class, views.TokenLoginView)

    def test_logout_url_is_resolved(self):
        url = reverse('auths:logout')
        self.assertEqual(resolve(url).func.view_class, views.TokenLogoutView)
