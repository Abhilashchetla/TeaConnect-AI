from django.db import models

# Create your models here.
from users.models import User

class Shop(models.Model):
    owner=models.ForeignKey(
        User,
        on_delete=models.CASCADE
    )

    shop_name=models.CharField(max_length=100)
    address=models.CharField()
    city=models.CharField(max_length=50)
    state=models.CharField(max_length=50)
    rating=models.FloatField(default=0)

    def __str__(self):
        return self.shop_name
