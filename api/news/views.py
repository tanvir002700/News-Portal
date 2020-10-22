from rest_framework import viewsets, permissions
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import BookMarkNews
from .serializers import BookMarkNewsSerializer
from .services import NewApiService


class NewApiViewSet(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]

    @action(methods=['GET'], detail=False)
    def top_news(self, request):
        top_headlines = NewApiService.get_top_news_by_query_params(
            request.query_params)
        return Response(top_headlines)


class BookMarkNewsViewSet(viewsets.ModelViewSet):
    serializer_class = BookMarkNewsSerializer
    permission_classes = (permissions.IsAuthenticated, )

    def get_queryset(self):
        user = self.request.user
        return BookMarkNews.objects.filter(user=user)
