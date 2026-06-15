from django.shortcuts import render

from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Cart
from .serializers import CartSerializer
@api_view(['POST'])
def add_to_cart(request):

    serializer = CartSerializer(
        data=request.data
    )

    if serializer.is_valid():

        serializer.save()

        return Response({
            "message": "Product Added To Cart"
        })

    return Response(
        serializer.errors
    )

@api_view(['GET'])
def view_cart(request,user_id):

    cart_items = Cart.objects.filter(
        user_id=user_id
    )

    serializer = CartSerializer(
        cart_items,
        many=True
    )

    return Response(
        serializer.data
    )

@api_view(['DELETE'])
def remove_cart_item(request,id):

    item = Cart.objects.get(
        id=id
    )

    item.delete()

    return Response({
        "message":"Item Removed"
    })

@api_view(['GET'])
def cart_total(request,user_id):

    cart_items = Cart.objects.filter(
        user_id=user_id
    )

    total = 0

    for item in cart_items:

        total += (
            item.product.price *
            item.quantity
        )

    return Response({
        "total": total
    })

