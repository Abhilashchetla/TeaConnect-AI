from django.urls import path
from .views import (
    create_product,
    list_products,
    product_detail,
    products_by_shop,
    my_products,
    delete_product,
)

urlpatterns = [
    path("create/", create_product),

    path("list/", list_products),
    path("my-products/", my_products),

    path("<int:id>/", product_detail),
    path("delete/<int:id>/", delete_product),

    path("shop/<int:shop_id>/", products_by_shop),
]