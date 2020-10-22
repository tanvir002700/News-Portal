from rest_framework.routers import DefaultRouter
from django.urls import path
from news import views

router = DefaultRouter()
router.register('news-api', views.NewApiViewSet, 'news-api')
router.register('book-mark-news', views.BookMarkNewsViewSet, 'book-mark-news')

urlpatterns = router.urls
