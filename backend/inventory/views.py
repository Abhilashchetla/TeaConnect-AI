from django.shortcuts import render

# Create your views here.
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Inventory
from .serializers import InventorySerializer

@api_view(['POST'])
def add_inventory(request):

    serializer = InventorySerializer(
        data=request.data
    )

    if serializer.is_valid():

        serializer.save()

        return Response({
            "message":"Inventory Added"
        })

    return Response(
        serializer.errors
    )

@api_view(['GET'])
def view_inventory(
    request,
    shop_id
):

    inventory = Inventory.objects.filter(
        shop_id=shop_id
    )

    serializer = InventorySerializer(
        inventory,
        many=True
    )

    return Response(
        serializer.data
    )


@api_view(['PUT'])
def update_inventory(
    request,
    inventory_id
):

    item = Inventory.objects.get(
        id=inventory_id
    )

    item.quantity = request.data.get(
        'quantity'
    )

    item.save()

    return Response({
        "message":"Stock Updated"
    })

@api_view(['GET'])
def low_stock_alert(
    request,
    shop_id
):

    inventory = Inventory.objects.filter(
        shop_id=shop_id
    )

    low_stock = []

    for item in inventory:

        if item.quantity <= item.threshold:

            low_stock.append({
                "ingredient":
                item.ingredient_name,

                "quantity":
                item.quantity
            })

    return Response(
        low_stock
    )

