from django.db import models
from shops.models import Shop

class Product(models.Model):

    CATEGORY_CHOICES = [
        ('Masala Tea', 'Masala Tea'),
        ('Ginger Tea', 'Ginger Tea'),
        ('Green Tea', 'Green Tea'),
        ('Lemon Tea', 'Lemon Tea'),
        ('Black Tea', 'Black Tea'),
    ]

    shop = models.ForeignKey(
        Shop,
        on_delete=models.CASCADE
    )

    tea_name = models.CharField(
        max_length=100
    )

    category = models.CharField(
        max_length=50,
        choices=CATEGORY_CHOICES
    )

    description = models.TextField()

    price = models.DecimalField(
        max_digits=6,
        decimal_places=2
    )

    available = models.BooleanField(
        default=True
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return self.tea_name
# Create your models here.
