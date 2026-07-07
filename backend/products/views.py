from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from .models import Product
from .serializers import ProductSerializer
from shops.models import Shop


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_product(request):

    try:
        shop = Shop.objects.get(owner=request.user)
    except Shop.DoesNotExist:
        return Response(
            {"error": "You must create a shop first"},
            status=status.HTTP_404_NOT_FOUND
        )

    serializer = ProductSerializer(data=request.data)

    if serializer.is_valid():

        serializer.save(shop=shop)

        return Response(
            serializer.data,
            status=status.HTTP_201_CREATED
        )

    return Response(
        serializer.errors,
        status=status.HTTP_400_BAD_REQUEST
    )


@api_view(['GET'])
def list_products(request):

    products = Product.objects.all()

    serializer = ProductSerializer(
        products,
        many=True
    )

    return Response(serializer.data)


@api_view(['GET'])
def product_detail(request, id):

    try:
        product = Product.objects.get(id=id)

    except Product.DoesNotExist:

        return Response(
            {"error": "Product not found"},
            status=status.HTTP_404_NOT_FOUND
        )

    serializer = ProductSerializer(product)

    return Response(serializer.data)


@api_view(['GET'])
def products_by_shop(request, shop_id):

    products = Product.objects.filter(
        shop_id=shop_id
    )

    serializer = ProductSerializer(
        products,
        many=True
    )

    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def my_products(request):

    products = Product.objects.filter(
        shop__owner=request.user
    )

    serializer = ProductSerializer(
        products,
        many=True
    )

    return Response(serializer.data)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_product(request, id):

    try:
        product = Product.objects.get(
            id=id,
            shop__owner=request.user
        )

        product.delete()

        return Response({
            "message": "Product Deleted Successfully"
        })

    except Product.DoesNotExist:

        return Response(
            {"error": "Product not found"},
            status=status.HTTP_404_NOT_FOUND
        )