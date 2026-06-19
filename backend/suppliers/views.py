from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Supplier, SupplierProduct, RestockRequest
from .serializers import SupplierSerializer,SupplierProductSerializer, RestockRequestSerializer
# Create your views here.
from inventory.models import Inventory
@api_view(['POST'])
def create_supplier(request):

    serializer = SupplierSerializer(
        data=request.data
    )

    if serializer.is_valid():

        serializer.save()

        return Response({
            "message":"Supplier Created"
        })

    return Response(
        serializer.errors
    )

@api_view(['POST'])
def add_supplier_product(request):

    serializer = SupplierProductSerializer(
        data=request.data
    )

    if serializer.is_valid():

        serializer.save()

        return Response({
            "message":"Supplier Product Added"
        })

    return Response(
        serializer.errors
    )

@api_view(['GET'])
def supplier_products(
    request,
    supplier_id
):

    products = SupplierProduct.objects.filter(
        supplier_id=supplier_id
    )

    serializer = SupplierProductSerializer(
        products,
        many=True
    )

    return Response(
        serializer.data
    )

@api_view(['POST'])
def create_restock_request(
    request
):

    serializer = RestockRequestSerializer(
        data=request.data
    )

    if serializer.is_valid():

        serializer.save()

        return Response({
            "message":
            "Restock Request Sent"
        })

    return Response(
        serializer.errors
    )

@api_view(['GET'])
def supplier_requests(
    request,
    supplier_id
):

    requests = RestockRequest.objects.filter(
        supplier_id=supplier_id
    )

    serializer = RestockRequestSerializer(
        requests,
        many=True
    )

    return Response(
        serializer.data
    )

@api_view(['PUT'])
def accept_request(
    request,
    request_id
):

    restock = RestockRequest.objects.get(
        id=request_id
    )

    restock.status = "Accepted"

    restock.save()

    inventory = Inventory.objects.filter(
        shop=restock.shop,
        ingredient_name=
        restock.ingredient_name
    ).first()

    if inventory:

        inventory.quantity += (
            restock.quantity
        )

        inventory.save()

    return Response({
        "message":
        "Request Accepted"
    })


@api_view(['PUT'])
def reject_request(
    request,
    request_id
):

    restock = RestockRequest.objects.get(
        id=request_id
    )

    restock.status = "Rejected"

    restock.save()

    return Response({
        "message":
        "Request Rejected"
    })


