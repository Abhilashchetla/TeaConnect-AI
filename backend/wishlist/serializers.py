from rest_framework import serializers
from .models import Wishlist


class WishlistSerializer(serializers.ModelSerializer):

    tea_name = serializers.CharField(source="product.tea_name", read_only=True)
    category = serializers.CharField(source="product.category", read_only=True)
    price = serializers.DecimalField(
        source="product.price",
        max_digits=10,
        decimal_places=2,
        read_only=True,
    )

    class Meta:
        model = Wishlist
        fields = [
            "id",
            "user",
            "product",
            "tea_name",
            "category",
            "price",
        ]