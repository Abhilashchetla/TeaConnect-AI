from django.urls import path
from .views import *

urlpatterns = [

    path(
        'create/',
        create_supplier
    ),

    path(
        'product/add/',
        add_supplier_product
    ),

    path(
        '<int:supplier_id>/products/',
        supplier_products
    ),
]