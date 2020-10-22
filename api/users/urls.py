from rest_framework.routers import DefaultRouter
from users import views


router = DefaultRouter()
router.register('users', views.UserViewSet, 'users')

urlpatterns = router.urls
