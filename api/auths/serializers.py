from django.contrib.auth import authenticate, get_user_model
from rest_framework import serializers
from djoser.serializers import TokenCreateSerializer


User = get_user_model()


class ImageLoginSerializer(serializers.Serializer):
    email = serializers.CharField()
    password = serializers.ImageField()

    default_error_messages = {
        "invalid_credentials": "Unable to login with the provided credentials",
        "inactive_account": "The account is inactive, please activate your account.",
    }

    def __init__(self, *args, **kwargs):
        super(ImageLoginSerializer, self).__init__(*args, **kwargs)
        self.user = None

    def validate(self, attrs):
        username = attrs.get('email')
        password = attrs.get('password')
        image = attrs.get('image')

        user_account = User.objects.filter(
            **{'email__iexact': username}).first()

        if not user_account:
            self.fail('invalid_credentials')

        self.user = authenticate(username=username, password=password,
                                 image=image)

        if not self.user:
            if user_account.is_active:
                self.fail('invalid_credentials')
            else:
                self.fail('inactive_account')

        if not self.user.is_active:
            self.fail('inactive_account')

        return attrs


class AdminLoginSerializer(TokenCreateSerializer):
    def validate(self, attrs):
        attrs = super(AdminLoginSerializer, self).validate(attrs)
        if not self.user.is_staff:
            self.fail('invalid_credentials')
        return attrs
