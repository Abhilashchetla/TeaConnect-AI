from django.urls import path
from .views import (
    create_supplier,
    add_supplier_product,
    supplier_products,
    create_restock_request,
    supplier_requests,
    accept_request,
    reject_request
)
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

    path(
        'restock/create/',
        create_restock_request
    ),

    path(
        'requests/<int:supplier_id>/',
        supplier_requests
    ),

    path(
        'accept/<int:request_id>/',
        accept_request
    ),

    path(
        'reject/<int:request_id>/',
        reject_request
    ),
]