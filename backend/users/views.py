from .models import User

from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

from rest_framework.decorators import (
    api_view,
    permission_classes,
)

from .serializers import RegisterSerializer


# ==========================================
# REGISTER USER
# ==========================================

@api_view(["POST"])
def register_user(request):

    serializer = RegisterSerializer(
        data=request.data
    )

    if serializer.is_valid():

        serializer.save()

        return Response(
            {
                "message": "User Registered Successfully"
            },
            status=status.HTTP_201_CREATED
        )

    return Response(
        serializer.errors,
        status=status.HTTP_400_BAD_REQUEST
    )


# ==========================================
# USER PROFILE
# ==========================================

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def profile(request):

    user = request.user

    return Response({
        "id": user.id,
        "username": user.username,
        "email": user.email,
        "phone": user.phone,
        "role": user.role,
    })


# ==========================================
# UPDATE PROFILE
# ==========================================

@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def update_profile(request):

    user = request.user

    user.username = request.data.get(
        "username",
        user.username
    )

    user.phone = request.data.get(
        "phone",
        user.phone
    )

    user.save()

    return Response({
        "message": "Profile Updated Successfully",

        "user": {
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "phone": user.phone,
            "role": user.role,
        }
    })


# ==========================================
# GET DELIVERY AGENTS
# ==========================================

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def delivery_agents(request):

    # Only owners should need this list
    if request.user.role != "owner":

        return Response(
            {
                "error": "Only shop owners can view delivery agents"
            },
            status=status.HTTP_403_FORBIDDEN
        )

    agents = User.objects.filter(
        role="delivery",
        is_active=True
    ).order_by("username")

    data = []

    for agent in agents:

        data.append({
            "id": agent.id,
            "username": agent.username,
            "email": agent.email,
            "phone": agent.phone,
        })

    return Response(data)