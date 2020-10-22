"""api URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.conf import settings
from django.urls import path
from django.conf.urls import include
from rest_framework.schemas import get_schema_view
from rest_framework.documentation import include_docs_urls
from django.conf.urls.static import static


schema_urls = get_schema_view(title=settings.API_BROWSER_HEADER, public=True)
doc_urls = include_docs_urls(title=settings.API_BROWSER_HEADER)
drf_urls = include('rest_framework.urls')

auths_urls = include(('auths.urls', 'auths'))
user_urls = include(('users.urls', 'users'))
news_urls = include(('news.urls', 'news'))


urlpatterns = [
    path('api/docs/', doc_urls),
    path('api/schema/', schema_urls),
    path('api/drf/', drf_urls),
    path('api/admin/', admin.site.urls),
    path('api/auth/', auths_urls),
    path('api/', user_urls),
    path('api/', news_urls)
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
