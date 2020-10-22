from rest_framework import viewsets, permissions
from rest_framework.response import Response
from rest_framework.decorators import action
from newsapi import NewsApiClient


class NewApiViewSet(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]

    @action(methods=['GET'], detail=False)
    def top_news(self, request):
        newsapi = NewsApiClient(api_key='669dd2aac2834f7dbf226fd7d8507931')
        top_headlines = newsapi.get_top_headlines(*request.query_params)
        return Response(top_headlines)
