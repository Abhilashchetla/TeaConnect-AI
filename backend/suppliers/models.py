from django.db import models

class Supplier(models.Model):

    company_name = models.CharField(
        max_length=100
    )

    email = models.EmailField(
        unique=True
    )

    phone = models.CharField(
        max_length=15
    )

    address = models.TextField()

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return self.company_name
    
class SupplierProduct(models.Model):

    supplier = models.ForeignKey(
        Supplier,
        on_delete=models.CASCADE
    )

    product_name = models.CharField(
        max_length=100
    )

    price = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    available_quantity = models.IntegerField()

    def __str__(self):
        return self.product_name