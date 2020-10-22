from django.urls import path
from auths import views


urlpatterns = [
    path('login/', views.TokenLoginView.as_view(), name='login'),
    path('logout/', views.TokenLogoutView.as_view(), name='logout')
]
