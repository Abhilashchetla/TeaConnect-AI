from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import User

@api_view(['POST'])
def register_user(request):

    user = User.objects.create(
        name=request.data.get('name'),
        email=request.data.get('email'),
        phone=request.data.get('phone'),
        role=request.data.get('role')
    )

    return Response({
        "message": "User Registered Successfully"
    })
