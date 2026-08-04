from rest_framework import serializers
from django.contrib.auth.hashers import make_password

from .models import User


class RegisterSerializer(serializers.ModelSerializer):

    shop_name = serializers.CharField(
        required=False,
        allow_blank=True,
        allow_null=True,
        write_only=True
    )

    shop_location = serializers.CharField(
        required=False,
        allow_blank=True,
        allow_null=True,
        write_only=True
    )

    class Meta:

        model = User

        fields = [
            "username",
            "email",
            "phone",
            "password",
            "role",
            "shop_name",
            "shop_location",
        ]

        extra_kwargs = {
            "password": {
                "write_only": True
            }
        }

    def create(self, validated_data):

        # Remove shop fields.
        # Shop will be created separately from Create Shop page.
        validated_data.pop(
            "shop_name",
            None
        )

        validated_data.pop(
            "shop_location",
            None
        )

        password = validated_data.pop(
            "password"
        )

        user = User.objects.create(
            **validated_data,
            password=make_password(password)
        )

        return user