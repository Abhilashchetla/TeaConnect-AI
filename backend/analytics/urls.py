from django.urls import path

from .views import (
    total_revenue,
    total_orders,
    top_products,
    inventory_alerts,
    dashboard_summary
)

urlpatterns = [

    path('revenue/',total_revenue),
    path('orders/',total_orders),
    path('top-products/',top_products),
    path('inventory-alerts/',inventory_alerts),
    path('summary/',dashboard_summary),
]