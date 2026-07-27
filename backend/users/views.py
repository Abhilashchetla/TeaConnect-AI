from django.shortcuts import render
from .models import User
from rest_framework.response import Response
from .serializers import RegisterSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import (
    api_view,
    permission_classes
)

@api_view(['POST'])
def register_user(request):

    serializer = RegisterSerializer(
        data=request.data
    )

    if serializer.is_valid():

        serializer.save()

        return Response({
            "message": "User Registered Successfully"
        })

    return Response(
        serializer.errors
    )
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def profile(request):

    user = request.user

    return Response({

        "id": user.id,

        "username": user.username,

        "email": user.email,

        "phone": user.phone,

        "role": user.role

    })

@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def update_profile(request):

    user = request.user

    user.username = request.data.get("username", user.username)
    user.phone = request.data.get("phone", user.phone)

    user.save()

    return Response({
        "message": "Profile Updated Successfully"
    })

