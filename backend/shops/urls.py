from django.urls import path

from .views import (
    create_shop,
    list_shops,
    shop_detail,
    my_shop,
    update_shop,
    nearby_shops,
)
urlpatterns = [
    path('create/',create_shop),
    path('list/',list_shops),
    path('<int:id>/',shop_detail),
    path("my-shop/", my_shop),
    path("update/", update_shop),
    path("nearby/", nearby_shops),
]