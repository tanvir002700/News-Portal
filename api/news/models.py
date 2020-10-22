from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class BookMarkNews(models.Model):
    title = models.TextField()
    url = models.URLField(max_length=300)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
