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
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def profile(request):

    return Response({
        "message":"Protected Route Working"
    })
