from django.urls import path
from .views import (
    create_product,
    list_products,
    product_detail,
    products_by_shop
)

urlpatterns = [
    path("create/", create_product),

    path("list/", list_products),

    path("<int:id>/", product_detail),

    path("shop/<int:shop_id>/", products_by_shop),
]