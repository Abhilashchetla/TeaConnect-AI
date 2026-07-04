from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):

    ROLE_CHOICES = [
        ('customer', 'Customer'),
        ('owner', 'Owner'),
        ('supplier', 'Supplier'),
        ('delivery', 'Delivery'),
        ('admin', 'Admin'),
    ]

    username = models.CharField(
        max_length=100,
        unique=True
    )

    email = models.EmailField(
        unique=True
    )

    phone = models.CharField(
        max_length=15
    )

    role = models.CharField(
        max_length=20,
        choices=ROLE_CHOICES,
        default="customer"
    )

    USERNAME_FIELD = "email"

    REQUIRED_FIELDS = ["username"]

    def __str__(self):
        return self.email