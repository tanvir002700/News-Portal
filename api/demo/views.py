from rest_framework import viewsets, views, permissions, status
from rest_framework.response import Response
from .serializers import TestSerializer
from .models import Test


class DemoApiListView(views.APIView):
    permission_classes = (permissions.AllowAny, )

    def get(self, request):
        return Response("Demo api root")


class TestViewSet(viewsets.ModelViewSet):
    queryset = Test.objects.all()
    serializer_class = TestSerializer
    permission_classes = (permissions.AllowAny, )
