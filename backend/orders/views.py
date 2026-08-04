from rest_framework.decorators import (
    api_view,
    permission_classes
)

from rest_framework.response import Response

from rest_framework.permissions import IsAuthenticated

from rest_framework import status


from .models import (
    Cart,
    Order,
    OrderItem
)

from .serializers import (
    CartSerializer,
    OrderSerializer
)

from shops.models import Shop

from products.models import Product

from users.models import User


# ==================== ADD TO CART ====================

@api_view(['POST'])
def add_to_cart(request):

    serializer = CartSerializer(
        data=request.data
    )

    if serializer.is_valid():

        serializer.save()

        return Response({

            "message": "Added",

            "data": serializer.data

        })

    return Response(
        serializer.errors,
        status=status.HTTP_400_BAD_REQUEST
    )


# ==================== VIEW CART ====================

@api_view(['GET'])
def view_cart(request, user_id):

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


# ==================== REMOVE CART ITEM ====================

@api_view(['DELETE'])
def remove_cart_item(request, id):

    try:

        item = Cart.objects.get(
            id=id
        )

    except Cart.DoesNotExist:

        return Response(
            {
                "error": "Cart item not found"
            },
            status=status.HTTP_404_NOT_FOUND
        )


    item.delete()

    return Response({

        "message": "Item Removed"

    })


# ==================== CART TOTAL ====================

@api_view(['GET'])
def cart_total(request, user_id):

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


# ==================== PLACE ORDER ====================

@api_view(['POST'])
def place_order(request, user_id):

    cart_items = Cart.objects.filter(
        user_id=user_id
    )


    if not cart_items.exists():

        return Response(
            {
                "error": "Cart is empty"
            },
            status=status.HTTP_400_BAD_REQUEST
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

        status="Pending"

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

        "message": "Order Placed Successfully",

        "order_id": order.id

    })


# ==================== CUSTOMER ORDER HISTORY ====================

@api_view(['GET'])
def order_history(request, user_id):

    orders = Order.objects.filter(
        user_id=user_id
    ).order_by("-created_at")


    serializer = OrderSerializer(
        orders,
        many=True
    )


    return Response(
        serializer.data
    )


# ==================== ORDER STATUS ====================

@api_view(['GET'])
def order_status(request, order_id):

    try:

        order = Order.objects.get(
            id=order_id
        )

    except Order.DoesNotExist:

        return Response(
            {
                "error": "Order not found"
            },
            status=status.HTTP_404_NOT_FOUND
        )


    return Response({

        "order_id": order.id,

        "status": order.status

    })


# ==================== UPDATE ORDER STATUS ====================

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_order_status(request, order_id):

    try:

        order = Order.objects.get(
            id=order_id
        )

    except Order.DoesNotExist:

        return Response(
            {
                "error": "Order not found"
            },
            status=status.HTTP_404_NOT_FOUND
        )


    new_status = request.data.get(
        "status"
    )


    valid_statuses = [

        choice[0]

        for choice in Order.STATUS_CHOICES

    ]


    if new_status not in valid_statuses:

        return Response(
            {
                "error": "Invalid order status"
            },
            status=status.HTTP_400_BAD_REQUEST
        )


    order.status = new_status

    order.save()


    return Response({

        "message": "Status Updated",

        "status": order.status

    })


# ==================== UPDATE CART QUANTITY ====================

@api_view(["PUT"])
def update_cart_quantity(request, id):

    try:

        cart = Cart.objects.get(
            id=id
        )

    except Cart.DoesNotExist:

        return Response(
            {
                "error": "Cart item not found"
            },
            status=status.HTTP_404_NOT_FOUND
        )


    quantity = request.data.get(
        "quantity"
    )


    if quantity is None:

        return Response(
            {
                "error": "Quantity is required"
            },
            status=status.HTTP_400_BAD_REQUEST
        )


    try:

        quantity = int(quantity)

    except (TypeError, ValueError):

        return Response(
            {
                "error": "Invalid quantity"
            },
            status=status.HTTP_400_BAD_REQUEST
        )


    if quantity < 1:

        return Response(
            {
                "error": "Quantity must be at least 1"
            },
            status=status.HTTP_400_BAD_REQUEST
        )


    cart.quantity = quantity

    cart.save()


    return Response({

        "message": "Quantity Updated",

        "quantity": cart.quantity

    })


# ==================== OWNER ORDERS ====================

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def owner_orders(request):

    try:

        shop = Shop.objects.get(
            owner=request.user
        )

    except Shop.DoesNotExist:

        return Response(
            {
                "error": "Shop not found"
            },
            status=status.HTTP_404_NOT_FOUND
        )


    products = Product.objects.filter(
        shop=shop
    )


    orders = Order.objects.filter(

        items__product__in=products

    ).distinct().order_by("-created_at")


    serializer = OrderSerializer(
        orders,
        many=True
    )


    return Response(
        serializer.data
    )


# ==================== DELIVERY AGENTS ====================

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def delivery_agents(request):

    agents = User.objects.filter(
        role="delivery",
        is_active=True
    )


    data = []


    for agent in agents:

        data.append({

            "id": agent.id,

            "username": agent.username,

            "email": agent.email,

            "phone": agent.phone,

        })


    return Response(data)


# ==================== ASSIGN DELIVERY AGENT ====================

@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def assign_delivery_agent(request, order_id):

    # Only shop owners should assign agents

    if request.user.role != "owner":

        return Response(
            {
                "error": "Only shop owners can assign delivery agents"
            },
            status=status.HTTP_403_FORBIDDEN
        )


    try:

        order = Order.objects.get(
            id=order_id
        )

    except Order.DoesNotExist:

        return Response(
            {
                "error": "Order not found"
            },
            status=status.HTTP_404_NOT_FOUND
        )


    agent_id = request.data.get(
        "delivery_agent_id"
    )


    if not agent_id:

        return Response(
            {
                "error": "Delivery agent is required"
            },
            status=status.HTTP_400_BAD_REQUEST
        )


    try:

        agent = User.objects.get(
            id=agent_id,
            role="delivery",
            is_active=True
        )

    except User.DoesNotExist:

        return Response(
            {
                "error": "Delivery agent not found"
            },
            status=status.HTTP_404_NOT_FOUND
        )


    # Make sure this order actually belongs to this owner's shop

    try:

        owner_shop = Shop.objects.get(
            owner=request.user
        )

    except Shop.DoesNotExist:

        return Response(
            {
                "error": "Owner shop not found"
            },
            status=status.HTTP_404_NOT_FOUND
        )


    belongs_to_shop = order.items.filter(
        product__shop=owner_shop
    ).exists()


    if not belongs_to_shop:

        return Response(
            {
                "error": "You cannot assign this order"
            },
            status=status.HTTP_403_FORBIDDEN
        )


    order.delivery_agent = agent

    order.save()


    return Response({

        "message": "Delivery Agent Assigned Successfully",

        "order_id": order.id,

        "delivery_agent": {

            "id": agent.id,

            "name": agent.username,

            "phone": agent.phone,

        }

    })


# ==================== DELIVERY AGENT ORDERS ====================

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def delivery_orders(request):

    if request.user.role != "delivery":

        return Response(
            {
                "error": "Only delivery agents can access this page"
            },
            status=status.HTTP_403_FORBIDDEN
        )


    orders = Order.objects.filter(
        delivery_agent=request.user
    ).order_by("-created_at")


    serializer = OrderSerializer(
        orders,
        many=True
    )


    return Response(
        serializer.data
    )


# ==================== DELIVERY STATUS UPDATE ====================

@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def delivery_update_status(request, order_id):

    if request.user.role != "delivery":

        return Response(
            {
                "error": "Only delivery agents can update delivery status"
            },
            status=status.HTTP_403_FORBIDDEN
        )


    try:

        order = Order.objects.get(
            id=order_id,
            delivery_agent=request.user
        )

    except Order.DoesNotExist:

        return Response(
            {
                "error": "Assigned order not found"
            },
            status=status.HTTP_404_NOT_FOUND
        )


    new_status = request.data.get(
        "status"
    )


    allowed_statuses = [

        "Picked Up",

        "Out For Delivery",

        "Delivered",

    ]


    if new_status not in allowed_statuses:

        return Response(
            {
                "error": "Invalid delivery status"
            },
            status=status.HTTP_400_BAD_REQUEST
        )


    order.status = new_status

    order.save()


    return Response({

        "message": "Delivery Status Updated",

        "order_id": order.id,

        "status": order.status

    })