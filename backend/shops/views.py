from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from .models import Shop
from .serializers import ShopSerializer


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_shop(request):

    if Shop.objects.filter(owner=request.user).exists():

        return Response(
            {"error": "You already have a shop"},
            status=status.HTTP_400_BAD_REQUEST
        )

    serializer = ShopSerializer(
        data=request.data
    )

    if serializer.is_valid():

        serializer.save(
            owner=request.user
        )

        return Response(
            serializer.data,
            status=status.HTTP_201_CREATED
        )

    return Response(
        serializer.errors,
        status=status.HTTP_400_BAD_REQUEST
    )


@api_view(['GET'])
def list_shops(request):

    shops = Shop.objects.all()

    serializer = ShopSerializer(
        shops,
        many=True
    )

    return Response(serializer.data)


@api_view(['GET'])
def shop_detail(request, id):

    try:

        shop = Shop.objects.get(id=id)

    except Shop.DoesNotExist:

        return Response(
            {"error": "Shop not found"},
            status=status.HTTP_404_NOT_FOUND
        )

    serializer = ShopSerializer(shop)

    return Response(serializer.data)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def my_shop(request):

    try:

        shop = Shop.objects.get(owner=request.user)

        serializer = ShopSerializer(shop)

        return Response(serializer.data)

    except Shop.DoesNotExist:

        return Response(
            {"error": "Shop not found"},
            status=404
        )


@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def update_shop(request):

    try:

        shop = Shop.objects.get(owner=request.user)

    except Shop.DoesNotExist:

        return Response(
            {"error": "Shop not found"},
            status=404
        )

    serializer = ShopSerializer(
        shop,
        data=request.data,
        partial=True
    )

    if serializer.is_valid():

        serializer.save()

        return Response(serializer.data)

    return Response(serializer.errors, status=400)