from rest_framework import serializers

from .models import Cart, Order, OrderItem


# ==================== CART ====================

class CartSerializer(serializers.ModelSerializer):

    product_name = serializers.CharField(
        source="product.tea_name",
        read_only=True
    )

    price = serializers.DecimalField(
        source="product.price",
        max_digits=10,
        decimal_places=2,
        read_only=True
    )

    class Meta:

        model = Cart

        fields = [
            "id",
            "user",
            "product",
            "quantity",
            "product_name",
            "price",
        ]


# ==================== ORDER ITEM ====================

class OrderItemSerializer(serializers.ModelSerializer):

    product_name = serializers.CharField(
        source="product.tea_name",
        read_only=True
    )

    shop_name = serializers.CharField(
        source="product.shop.shop_name",
        read_only=True
    )

    class Meta:

        model = OrderItem

        fields = [
            "id",
            "product",
            "product_name",
            "shop_name",
            "quantity",
            "price",
        ]


# ==================== ORDER ====================

class OrderSerializer(serializers.ModelSerializer):

    customer_name = serializers.CharField(
        source="user.username",
        read_only=True
    )

    customer_phone = serializers.CharField(
        source="user.phone",
        read_only=True
    )

    customer_email = serializers.CharField(
        source="user.email",
        read_only=True
    )


    # Delivery Agent Details

    delivery_agent_name = serializers.CharField(
        source="delivery_agent.username",
        read_only=True
    )

    delivery_agent_phone = serializers.CharField(
        source="delivery_agent.phone",
        read_only=True
    )

    delivery_agent_email = serializers.CharField(
        source="delivery_agent.email",
        read_only=True
    )


    # Order Products

    items = OrderItemSerializer(
        many=True,
        read_only=True
    )


    class Meta:

        model = Order

        fields = [
            "id",

            "customer_name",
            "customer_phone",
            "customer_email",

            "delivery_agent",
            "delivery_agent_name",
            "delivery_agent_phone",
            "delivery_agent_email",

            "total_amount",
            "status",
            "created_at",

            "items",
        ]

        read_only_fields = [
            "delivery_agent"
        ]