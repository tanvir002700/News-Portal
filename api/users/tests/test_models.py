from django.test import TestCase
from users.models import User


class TestUserModel(TestCase):
    def test_create_user(self):
        user = User.objects.create_user(email="user@email.com",
                                        password="password-super")
        self.assertFalse(user.is_staff)
        self.assertFalse(user.is_superuser)

    def test_create_super_user(self):
        user = User.objects.create_superuser(email="admin@email.com",
                                             password="password-super")
        self.assertTrue(user.is_staff)
        self.assertTrue(user.is_superuser)
