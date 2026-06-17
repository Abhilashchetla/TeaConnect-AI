from django.db import models
from shops.models import Shop

class Inventory(models.Model):

    shop = models.ForeignKey(
        Shop,
        on_delete=models.CASCADE
    )

    ingredient_name = models.CharField(
        max_length=100
    )

    quantity = models.PositiveIntegerField()

    threshold = models.PositiveIntegerField(
        default=10
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    def __str__(self):
        return self.ingredient_name
