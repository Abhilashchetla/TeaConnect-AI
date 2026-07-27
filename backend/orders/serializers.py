from rest_framework import serializers
from .models import Cart, Order, OrderItem


# ---------------- CART ---------------- #

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


# ---------------- ORDER ITEM ---------------- #

class OrderItemSerializer(serializers.ModelSerializer):

    product_name = serializers.CharField(
        source="product.tea_name",
        read_only=True
    )

    class Meta:
        model = OrderItem
        fields = [
            "id",
            "product",
            "product_name",
            "quantity",
            "price",
        ]


# ---------------- ORDER ---------------- #

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

    items = serializers.SerializerMethodField()

    class Meta:
        model = Order
        fields = [
            "id",
            "customer_name",
            "customer_phone",
            "customer_email",
            "total_amount",
            "status",
            "created_at",
            "items",
        ]

    def get_items(self, obj):

        items = OrderItem.objects.filter(order=obj)

        return OrderItemSerializer(
            items,
            many=True
        ).data