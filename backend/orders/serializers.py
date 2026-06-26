from rest_framework import serializers
from .models import Cart, Order, OrderItem


from rest_framework import serializers
from .models import Cart, Order, OrderItem

from rest_framework import serializers
from .models import Cart


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
            "price"
        ]

class OrderSerializer(serializers.ModelSerializer):

    class Meta:
        model = Order
        fields = '__all__'


class OrderItemSerializer(serializers.ModelSerializer):

    class Meta:
        model = OrderItem
        fields = '__all__'