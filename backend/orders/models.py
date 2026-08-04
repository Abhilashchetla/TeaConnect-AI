from django.db import models
from users.models import User
from products.models import Product


# ==================== CART ====================

class Cart(models.Model):

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE
    )

    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE
    )

    quantity = models.PositiveIntegerField(
        default=1
    )

    added_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return f"{self.user.username} - {self.product.tea_name}"


# ==================== ORDER ====================

class Order(models.Model):

    STATUS_CHOICES = [

        ('Pending', 'Pending'),

        ('Preparing', 'Preparing'),

        ('Ready For Pickup', 'Ready For Pickup'),

        ('Picked Up', 'Picked Up'),

        ('Out For Delivery', 'Out For Delivery'),

        ('Delivered', 'Delivered'),

        ('Cancelled', 'Cancelled'),
    ]


    # Customer who placed the order
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="customer_orders"
    )


    # Delivery agent assigned to this order
    delivery_agent = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="delivery_orders",
        limit_choices_to={
            "role": "delivery"
        }
    )


    total_amount = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )


    status = models.CharField(
        max_length=30,
        choices=STATUS_CHOICES,
        default='Pending'
    )


    created_at = models.DateTimeField(
        auto_now_add=True
    )


    def __str__(self):
        return f"Order {self.id}"


# ==================== ORDER ITEM ====================

class OrderItem(models.Model):

    order = models.ForeignKey(
        Order,
        on_delete=models.CASCADE,
        related_name="items"
    )

    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE
    )

    quantity = models.PositiveIntegerField()

    price = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    def __str__(self):
        return self.product.tea_name