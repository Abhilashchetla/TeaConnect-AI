from django.urls import path

from .views import (

    add_to_cart,

    view_cart,

    remove_cart_item,

    cart_total,

    place_order,

    order_history,

    order_status,

    update_order_status,

    update_cart_quantity,

    owner_orders,

    delivery_agents,

    assign_delivery_agent,

    delivery_orders,

    delivery_update_status,

)


urlpatterns = [

    # ================= CART =================
    path("add/",add_to_cart),
    path("user/<int:user_id>/",view_cart),
    path("remove/<int:id>/",remove_cart_item),
    path("total/<int:user_id>/",cart_total),
    path("update/<int:id>/",update_cart_quantity),
    # ================= CUSTOMER ORDERS =================
    path("place/<int:user_id>/",place_order),
    path("history/<int:user_id>/",order_history),
    path("status/<int:order_id>/",order_status),
    path("owner-orders/",owner_orders),
    path("update-status/<int:order_id>/",update_order_status),
    path("delivery-agents/",delivery_agents),
    path("assign-delivery/<int:order_id>/",assign_delivery_agent),
    # ================= DELIVERY AGENT =================
    path("delivery/orders/",delivery_orders),
    path("delivery/update-status/<int:order_id>/",delivery_update_status),

]