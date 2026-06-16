from django.urls import path

from .views import (
    add_to_cart,
    view_cart,
    remove_cart_item,
    cart_total,
    place_order,
    order_history,
    order_status,
    update_order_status

)

urlpatterns = [
    path('add/',add_to_cart),
    path('user/<int:user_id>/',view_cart),
    path('remove/<int:id>/',remove_cart_item),
    path('total/<int:user_id>/',cart_total),
    path('place/<int:user_id>/',place_order),
    path('history/<int:user_id>/',order_history),
    path('status/<int:order_id>/',order_status),
    path('update-status/<int:order_id>/',update_order_status),
]