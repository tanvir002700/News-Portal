from rest_framework.routers import DefaultRouter
from .views import TestViewSet


router = DefaultRouter()
router.register('tests', TestViewSet, 'test')
urlpatterns = router.urls
