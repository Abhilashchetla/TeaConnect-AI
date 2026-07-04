from rest_framework import serializers
from django.contrib.auth.hashers import make_password

from .models import User
from shops.models import Shop


class RegisterSerializer(serializers.ModelSerializer):

    shop_name = serializers.CharField(
        required=False,
        write_only=True
    )

    shop_location = serializers.CharField(
        required=False,
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
            "shop_location"

        ]

    def create(self, validated_data):

        shop_name = validated_data.pop(
            "shop_name",
            None
        )

        shop_location = validated_data.pop(
            "shop_location",
            None
        )

        user = User.objects.create(

            username=validated_data["username"],

            email=validated_data["email"],

            phone=validated_data["phone"],

            role=validated_data["role"],

            password=make_password(
                validated_data["password"]
            )

        )

        if user.role == "owner":

            Shop.objects.create(

                owner=user,

                shop_name=shop_name,

                location=shop_location

            )

        return user