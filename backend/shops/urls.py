from django.urls import path

from .views import (
    create_shop,
    list_shops,
    shop_detail
)
urlpatterns = [
    path('create/',create_shop),
    path('',list_shops),
    path('<int:id>/',shop_detail),
]