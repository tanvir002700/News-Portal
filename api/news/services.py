from newsapi import NewsApiClient
from django.conf import settings
from rest_framework import exceptions, status

class NewApiService:
    KEY = getattr(settings, 'NEWS_API_KEY', '')

    @staticmethod
    def get_top_news_by_query_params(query_params):
        newsapi = NewsApiClient(api_key=NewApiService.KEY)
        search_query = query_params.get('q')
        country_query = query_params.get('country')
        category_query = query_params.get('category')
        source_query = query_params.get('source')
        try:
            top_headlines = newsapi.get_top_headlines(
                q=search_query,
                country=country_query,
                category=category_query,
                sources=source_query)
        except ValueError as e:
            raise exceptions.ValidationError(
                str(e), status.HTTP_400_BAD_REQUEST)

        return top_headlines
