from django.contrib import admin
from rest_framework import views, permissions
from rest_framework.response import Response

# Register your models here.

class DemoApiListView(views.APIView):
    permission_classes = (permissions.AllowAny, )

    def get(self, request):
        return Response("World api root")

