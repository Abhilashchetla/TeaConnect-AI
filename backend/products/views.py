from django.shortcuts import render

# Create your views here.
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Product
from .serializers import ProductSerializer
@api_view(['POST'])
def create_product(request):

    serializer = ProductSerializer(
        data=request.data
    )

    if serializer.is_valid():

        serializer.save()

        return Response({
            "message":"Product Added"
        })

    return Response(
        serializer.errors
    )

@api_view(['GET'])
def list_products(request):

    products = Product.objects.all()

    serializer = ProductSerializer(
        products,
        many=True
    )

    return Response(
        serializer.data
    )

@api_view(['GET'])
def product_detail(request,id):

    product = Product.objects.get(
        id=id
    )

    serializer = ProductSerializer(
        product
    )

    return Response(
        serializer.data
    )
@api_view(['GET'])
def products_by_shop(request,shop_id):

    products = Product.objects.filter(
        shop_id=shop_id
    )

    serializer = ProductSerializer(
        products,
        many=True
    )

    return Response(
        serializer.data
    )