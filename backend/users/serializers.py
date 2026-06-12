from rest_framework import serializers
from .models import User
from django.contrib.auth.hashers import make_password

class RegisterSerializer(serializers.ModelSerializer):

    class Meta:
        model = User

        fields = '__all__'

    def create(self, validated_data):

        validated_data['password'] = make_password(
            validated_data['password']
        )

        return User.objects.create(
            **validated_data
        )