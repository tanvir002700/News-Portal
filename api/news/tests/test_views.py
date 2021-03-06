import vcr
from rest_framework.test import APITestCase
from rest_framework import status
from rest_framework.authtoken.models import Token
from django.contrib.auth import get_user_model
from django.urls import reverse
from news.models import BookMarkNews

User = get_user_model()


class TestNewsViewSetTopNews(APITestCase):
    top_news_url = reverse('news:news-api-top-news')
    test_vcr = vcr.VCR(filter_headers=[('authorization', None)])

    def setUp(self):
        self.user = User.objects.create_user(email='test@email.com',
                                             password="password")
        self.token = Token.objects.create(user=self.user)
        self.client.credentials(HTTP_AUTHORIZATION="Token " + self.token.key)

    @test_vcr.use_cassette('api/fixtures/vcr_cassettes/top_news.yaml')
    def test_top_new_without_filter(self):
        response = self.client.get(self.top_news_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertDictContainsSubset({'status': 'ok', 'totalResults': 464}, response.data)
        self.assertDictContainsSubset({
            'source': {
                'id': None,
                'name': 'Irish Mirror'
            },
            'author': 'Sam Roberts',
            'title': "Ireland weather: Met Eireann forecast urgent snow alert as 'dangerous' -4C big freeze to hit - Irish Mirror",
            'description': 'Temperatures are set to plummet in the coming days as a cold snap arrives',
            'url': 'https://www.irishmirror.ie/news/irish-news/ireland-weather-met-eireann-forecast-23453179',
            'urlToImage': 'https://i2-prod.irishmirror.ie/incoming/article11626449.ece/ALTERNATES/s1200/1_irish-breaking-news-logo-stock-generic-irish-mirror.png',
            'publishedAt': '2021-02-06T08:28:00Z',
            'content': 'Met Eireann have issued an urgent snow alert as a big freeze is set to hit Ireland with temperatures plummeting as low as -4C.\r\nThe Weather Advisory is in place from 6am on Sunday until 6pm on Wednes… [+4362 chars]'
        }, response.data['articles'][0])

    @test_vcr.use_cassette('api/fixtures/vcr_cassettes/top_news_with_query_filter.yaml')
    def test_top_new_with_query_filter(self):
        url = "%s?q=%s" % (self.top_news_url, 'football')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertDictContainsSubset({'status': 'ok', 'totalResults': 3}, response.data)
        self.assertDictContainsSubset({
            'source': {
                'id': None,
                'name': 'Football.London'
            },
            'author': 'Robert Warlow',
            'title': 'Jermaine Jenas makes Jose Mourinho sack claim amid increasing pressure after Tottenham form - Football.London',
            'description': 'Jose Mourinho and his Tottenham side have faced fresh criticism after recent results, with Spurs slipping to eighth in the Premier League after three straight defeats',
            'url': 'https://www.football.london/tottenham-hotspur-fc/news/jermaine-jenas-jose-mourinho-claim-19783620',
            'urlToImage': 'https://i2-prod.football.london/incoming/article19552689.ece/ALTERNATES/s1200/1_GettyImages-1230389926.jpg',
            'publishedAt': '2021-02-06T06:30:00Z',
            'content': "Former Tottenham Hotspur midfielder Jermaine Jenas has said he cannot see Jose Mourinho being sacked by Spurs, despite the club's poor recent form.\r\nSpurs have lost their last three Premier League ga… [+3548 chars]"
        }, response.data['articles'][0])

    @test_vcr.use_cassette('api/fixtures/vcr_cassettes/top_news_with_country_filter.yaml')
    def test_top_new_with_country_filter(self):
        url = "%s?country=%s" % (self.top_news_url, 'us')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertDictContainsSubset({'status': 'ok', 'totalResults': 35}, response.data)

    @test_vcr.use_cassette('api/fixtures/vcr_cassettes/top_news_with_category_filter.yaml')
    def test_top_new_with_category_filter(self):
        url = "%s?category=%s" % (self.top_news_url, 'business')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertDictContainsSubset({'status': 'ok', 'totalResults': 602}, response.data)

    @test_vcr.use_cassette('api/fixtures/vcr_cassettes/top_news_with_source_filter.yaml')
    def test_top_new_with_source_filter(self):
        url = "%s?source=%s" % (self.top_news_url, 'Wired')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertDictContainsSubset({'status': 'ok', 'totalResults': 10}, response.data)

    def test_top_new_with_mix_filter(self):
        url = "%s?category=%s&source=%s" % (self.top_news_url, 'business', 'Wired')
        response = self.client.get(url)
        print(response.data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


class TestBookMarkNewsCreateEndpint(APITestCase):
    create_book_mark_url = reverse('news:book-mark-news-list')

    def setUp(self):
        self.user = User.objects.create_user(email='test@email.com',
                                             password="password")
        BookMarkNews.objects.create(
            title='test', url='http://www.same.com', user=self.user)
        self.token = Token.objects.create(user=self.user)
        self.client.credentials(HTTP_AUTHORIZATION="Token " + self.token.key)

    def test_create_success_with_valid_data(self):
        data = {
            'title': 'Test Book Mark',
            'url': 'http://www.xyz.com'
        }
        response = self.client.post(self.create_book_mark_url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_create_failed_without_authenticated_user(self):
        self.client.force_authenticate(user=None)
        data = {
            'title': 'Test Book Mark',
            'url': 'http://www.xyz.com'
        }
        response = self.client.post(self.create_book_mark_url, data)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_create_failed_for_invalid_url(self):
        data = {
            'title': 'Test Book Mark',
            'url': 'www.xyz'
        }
        response = self.client.post(self.create_book_mark_url, data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_same_user_cant_create_with_same_url_bookmark_multiple_time(self):
        data = {
            'title': 'Test Book Mark',
            'url': 'http://www.same.com'
        }
        response = self.client.post(self.create_book_mark_url, data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
