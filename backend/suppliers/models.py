from django.db import models
from shops.models import Shop


class Supplier(models.Model):

    company_name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=15)
    address = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return self.company_name
class RestockRequest(models.Model):
    STATUS_CHOICES = [
        ('Pending', 'Pending'),
        ('Accepted', 'Accepted'),
        ('Rejected', 'Rejected'),
    ]
    shop = models.ForeignKey(Shop,on_delete=models.CASCADE)
    supplier = models.ForeignKey(Supplier,on_delete=models.CASCADE)
    ingredient_name = models.CharField(max_length=100)
    quantity = models.IntegerField()
    status = models.CharField(max_length=20,choices=STATUS_CHOICES,default='Pending')
    created_at = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return self.ingredient_name
     
class SupplierProduct(models.Model):

    supplier = models.ForeignKey(Supplier,on_delete=models.CASCADE)
    product_name = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10,decimal_places=2)
    available_quantity = models.IntegerField()
    
    def __str__(self):
        return self.product_name