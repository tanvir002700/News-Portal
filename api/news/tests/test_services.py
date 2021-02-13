from newsapi import NewsApiClient
from django.test import TestCase
from news.services import NewApiService
from unittest.mock import patch


class TestNewApiService(TestCase):
    @patch.object(NewsApiClient, 'get_top_headlines')
    def test_xyz(self, mock_get_top_headlines):
        query_params = {'q': 'football', 'country': 'us'}
        mock_get_top_headlines.return_value = {'response': 'ok'}
        top_news = NewApiService.get_top_news_by_query_params(query_params)
        mock_get_top_headlines.assert_called_once_with(
            **query_params, category=None, sources=None)
        self.assertEqual(top_news, {'response': 'ok'})
