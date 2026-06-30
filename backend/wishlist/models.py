from django.db import models
from users.models import User
from products.models import Product

class Wishlist(models.Model):

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE
    )

    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    class Meta:
        unique_together = ('user', 'product')  # Prevent duplicate wishlist entries

    def __str__(self):
        return f"{self.user.name} - {self.product.tea_name}"
