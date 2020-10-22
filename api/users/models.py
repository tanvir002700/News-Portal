from django.db import models
from imagekit.models import ImageSpecField, ProcessedImageField
from imagekit.processors import ResizeToFill
from django.contrib.auth.models import (AbstractUser,
                                        UserManager as DefaultUserManager)
from django.utils.translation import gettext_lazy as _


class UserManager(DefaultUserManager):
    def _create_user(self, email, password, **extra_fields):
        if not email:
            raise ValueError(_('The Email must be set'))
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_user(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self._create_user(email, password, **extra_fields)


class User(AbstractUser):
    username = None
    picture = ProcessedImageField(upload_to='avatars/%Y/%m/%d/',
                                  processors=[ResizeToFill(300, 300)],
                                  format='JPEG',
                                  options={
                                      'quality': 90,
                                      'optimized': True,
                                      'progressive': True
                                  },
                                  blank=True,
                                  null=True)
    thumbnail = ImageSpecField(source='picture',
                               processors=[ResizeToFill(100, 100)],
                               format='JPEG',
                               options={'quality': 80})
    email = models.EmailField(_('email address'), unique=True)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = UserManager()
