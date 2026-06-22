from django.db.models import Sum
from rest_framework.decorators import api_view
from rest_framework.response import Response

from orders.models import Order, OrderItem
from inventory.models import Inventory
from ml.predictor import predict_orders
from django.db.models import Sum
from orders.models import OrderItem
from products.models import Product
from shops.models import Shop
from suppliers.models import Supplier


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


@api_view(['GET'])
def demand_prediction(
    request,
    day
):

    predicted_orders = (
        predict_orders(day)
    )

    return Response({

        "future_day": day,

        "predicted_orders":
        predicted_orders

    })

@api_view(['GET'])
def inventory_forecast(
    request,
    day
):

    demand = predict_orders(day)

    tea_powder_needed = (
        demand * 50
    )

    milk_needed = (
        demand * 200
    )

    sugar_needed = (
        demand * 20
    )

    return Response({

        "predicted_orders":
        demand,

        "tea_powder_g":
        tea_powder_needed,

        "milk_ml":
        milk_needed,

        "sugar_g":
        sugar_needed

    })

@api_view(['GET'])
def best_selling_tea(request):

    tea = (
        OrderItem.objects
        .values(
            'product__tea_name'
        )
        .annotate(
            sold=Sum('quantity')
        )
        .order_by('-sold')
        .first()
    )

    return Response(
        tea
    )

@api_view(['GET'])
def recommend_tea(request, user_id):

    user_orders = OrderItem.objects.filter(
        order__user_id=user_id
    )

    category_count = {}

    for item in user_orders:

        category = item.product.category

        if category not in category_count:

            category_count[category] = 0

        category_count[category] += item.quantity

    if not category_count:

        return Response({
            "message":
            "No order history found"
        })

    favorite_category = max(
        category_count,
        key=category_count.get
    )

    recommendations = Product.objects.filter(
        category=favorite_category
    )[:5]

    data = []

    for product in recommendations:

        data.append({

            "tea_name":
            product.tea_name,

            "category":
            product.category,

            "price":
            product.price

        })

    return Response({

        "favorite_category":
        favorite_category,

        "recommendations":
        data

    })

@api_view(['GET'])
def customer_insights(
    request,
    user_id
):

    orders = OrderItem.objects.filter(
        order__user_id=user_id
    )

    total_items = 0

    total_spent = 0

    for item in orders:

        total_items += item.quantity

        total_spent += (
            item.quantity *
            item.price
        )

    return Response({

        "total_items_ordered":
        total_items,

        "total_spent":
        total_spent

    })

@api_view(['GET'])
def shop_performance(
    request,
    shop_id
):

    products = Product.objects.filter(
        shop_id=shop_id
    )

    total_products = products.count()

    return Response({

        "shop_id":
        shop_id,

        "total_products":
        total_products

    })

@api_view(['GET'])
def ai_dashboard(request):

    total_orders = Order.objects.count()

    revenue = Order.objects.aggregate(
        total=Sum('total_amount')
    )

    products = Product.objects.count()

    shops = Shop.objects.count()

    suppliers = Supplier.objects.count()

    return Response({

        "orders":
        total_orders,

        "revenue":
        revenue['total'] or 0,

        "products":
        products,

        "shops":
        shops,

        "suppliers":
        suppliers

    })





