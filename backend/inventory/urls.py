from django.urls import path

from .views import (add_inventory,view_inventory,update_inventory,low_stock_alert)

urlpatterns = [
    path('add/',add_inventory),
    path('<int:shop_id>/',view_inventory),
    path('update/<int:inventory_id>/',update_inventory),
    path('low-stock/<int:shop_id>/',low_stock_alert),
]