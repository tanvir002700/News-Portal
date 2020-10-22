from rest_framework import serializers
from .models import BookMarkNews


class BookMarkNewsSerializer(serializers.ModelSerializer):
    class Meta:
        model = BookMarkNews
        fields = ('id', 'title', 'url')

    def validate_url(self, url):
        user = self.context.get('request').user
        already_book_marked = BookMarkNews.objects.filter(
            user=user, url=url).exists()
        if already_book_marked:
            raise serializers.ValidationError('Already Book Marked')
        return url

    def create(self, validated_data):
        user = self.context.get('request').user
        return BookMarkNews.objects.create(user=user, **validated_data)
