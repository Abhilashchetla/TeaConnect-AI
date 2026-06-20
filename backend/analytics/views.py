from django.db.models import Sum
from rest_framework.decorators import api_view
from rest_framework.response import Response

from orders.models import Order, OrderItem
from inventory.models import Inventory

@api_view(['GET'])
def total_revenue(request):

    revenue = Order.objects.aggregate(
        total=Sum('total_amount')
    )

    return Response({
        "total_revenue":
        revenue['total'] or 0
    })

@api_view(['GET'])
def total_orders(request):

    count = Order.objects.count()

    return Response({
        "total_orders": count
    })


@api_view(['GET'])
def top_products(request):

    products = (
        OrderItem.objects
        .values(
            'product__tea_name'
        )
        .annotate(
            sold=Sum('quantity')
        )
        .order_by('-sold')[:5]
    )

    return Response(products)

@api_view(['GET'])
def inventory_alerts(request):

    inventory = Inventory.objects.all()

    low_stock = []

    for item in inventory:

        if item.quantity <= item.threshold:

            low_stock.append({

                "ingredient":
                item.ingredient_name,

                "quantity":
                item.quantity,

                "threshold":
                item.threshold

            })

    return Response(low_stock)


@api_view(['GET'])
def dashboard_summary(request):

    revenue = Order.objects.aggregate(
        total=Sum('total_amount')
    )

    total_orders = Order.objects.count()

    low_stock = Inventory.objects.filter(
        quantity__lte=10
    ).count()

    return Response({

        "total_revenue":
        revenue['total'] or 0,

        "total_orders":
        total_orders,

        "low_stock_items":
        low_stock

    })


