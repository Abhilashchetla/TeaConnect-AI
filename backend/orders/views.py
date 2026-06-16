from django.shortcuts import render

from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Cart,Order,OrderItem
from .serializers import CartSerializer,OrderItemSerializer,OrderSerializer

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
@api_view(['POST'])
def place_order(request, user_id):

    cart_items = Cart.objects.filter(
        user_id=user_id
    )

    total = 0

    for item in cart_items:
        total += (
            item.product.price *
            item.quantity
        )

    order = Order.objects.create(
        user_id=user_id,
        total_amount=total,
        status='Pending'

    )

    for item in cart_items:

        OrderItem.objects.create(
            order=order,
            product=item.product,
            quantity=item.quantity,
            price=item.product.price
        )

    cart_items.delete()

    return Response({
        "message": "Order Placed",
        "order_id": order.id
    })

@api_view(['GET'])
def order_history(request, user_id):

    orders = Order.objects.filter(
        user_id=user_id
    )

    serializer = OrderSerializer(
        orders,
        many=True
    )

    return Response(
        serializer.data
    )

@api_view(['GET'])
def order_status(request, order_id):

    order = Order.objects.get(
        id=order_id
    )

    return Response({
        "order_id": order.id,
        "status": order.status
    })
@api_view(['PUT'])
def update_order_status(request, order_id):

    order = Order.objects.get(id=order_id)

    status = request.data.get('status')

    if not status:
        return Response({
            "error": "status is required"
        }, status=400)

    order.status = status
    order.save()

    return Response({
        "message": "Status Updated"
    })
