from django.urls import path

from .views import (
    add_to_cart,
    view_cart,
    remove_cart_item,
    cart_total
)

urlpatterns = [
    path('add/',add_to_cart),
    path('user/<int:user_id>/',view_cart),
    path('remove/<int:id>/',remove_cart_item),
    path('total/<int:user_id>/',cart_total),
]