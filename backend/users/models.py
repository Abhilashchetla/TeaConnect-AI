from django.db import models

# Create your models here.
class User(models.Model):
    ROLE_CHOICES=[
        ('customer','Customers'),
        ('owner','Owner'),
        ('supplier','Supplier'),
        ('delivery','Delivery'),
        ('admin','Admin')
    ]

    name=models.CharField(max_length=100)
    email=models.EmailField(unique=True)
    phone=models.CharField(max_length=15)
    role=models.CharField(max_length=20,choices=ROLE_CHOICES)
    created_at=models.DateTimeField(auto_now_add=True)


    def __str__(self):
        return self.name
