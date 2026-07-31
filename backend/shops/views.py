from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from .models import Shop
from .serializers import ShopSerializer
from math import radians, sin, cos, sqrt, atan2

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


def haversine(lat1, lon1, lat2, lon2):
    R = 6371  # Earth's radius in kilometers

    lat1 = radians(lat1)
    lon1 = radians(lon1)
    lat2 = radians(lat2)
    lon2 = radians(lon2)

    dlat = lat2 - lat1
    dlon = lon2 - lon1

    a = sin(dlat / 2) ** 2 + cos(lat1) * cos(lat2) * sin(dlon / 2) ** 2
    c = 2 * atan2(sqrt(a), sqrt(1 - a))

    return R * c


@api_view(["POST"])
def nearby_shops(request):

    customer_lat = request.data.get("latitude")
    customer_lng = request.data.get("longitude")

    if customer_lat is None or customer_lng is None:
        return Response(
            {"error": "Latitude and Longitude are required"},
            status=status.HTTP_400_BAD_REQUEST
        )

    customer_lat = float(customer_lat)
    customer_lng = float(customer_lng)

    shops = Shop.objects.exclude(
        latitude__isnull=True,
        longitude__isnull=True
    )

    nearby = []

    for shop in shops:

        distance = haversine(
            customer_lat,
            customer_lng,
            shop.latitude,
            shop.longitude
        )

        serializer = ShopSerializer(shop)

        data = serializer.data
        data["distance"] = round(distance, 2)

        nearby.append(data)

    nearby.sort(key=lambda x: x["distance"])

    return Response(nearby)