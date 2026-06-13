from django.shortcuts import render

# Create your views here.
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Shop
from .serializers import ShopSerializer
@api_view(['POST'])
def create_shop(request):

    serializer = ShopSerializer(
        data=request.data
    )

    if serializer.is_valid():
        serializer.save()

        return Response({
            "message": "Shop Created"
        })

    return Response(
        serializer.errors
    )
@api_view(['GET'])
def list_shops(request):

    shops = Shop.objects.all()

    serializer = ShopSerializer(
        shops,
        many=True
    )

    return Response(
        serializer.data
    )
@api_view(['GET'])
def shop_detail(request,id):

    shop = Shop.objects.get(
        id=id
    )

    serializer = ShopSerializer(
        shop
    )

    return Response(
        serializer.data
    )