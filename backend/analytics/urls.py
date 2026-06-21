from django.urls import path

from .views import (
    total_revenue,
    total_orders,
    top_products,
    inventory_alerts,
    dashboard_summary,
    demand_prediction,
    inventory_forecast,
    best_selling_tea
)

urlpatterns = [

    path('revenue/',total_revenue),
    path('orders/',total_orders),
    path('top-products/',top_products),
    path('inventory-alerts/',inventory_alerts),
    path('summary/',dashboard_summary),
    path('predict/<int:day>/',demand_prediction),
    path('forecast/<int:day>/',inventory_forecast),
    path('best-tea/',best_selling_tea),
]