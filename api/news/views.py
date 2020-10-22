from rest_framework import viewsets, permissions
from rest_framework.response import Response
from rest_framework.decorators import action
from newsapi import NewsApiClient


class NewApiViewSet(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]

    @action(methods=['GET'], detail=False)
    def top_news(self, request):
        newsapi = NewsApiClient(api_key='669dd2aac2834f7dbf226fd7d8507931')
        search_query = request.query_params.get('q')
        country_query = request.query_params.get('country')
        category_query = request.query_params.get('category')
        source_query = request.query_params.get('source')
        top_headlines = newsapi.get_top_headlines(q=search_query,
                                                  country=country_query,
                                                  category=category_query,
                                                  sources=source_query)
        return Response(top_headlines)
