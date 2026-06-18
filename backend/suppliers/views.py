from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Supplier, SupplierProduct
from .serializers import SupplierSerializer,SupplierProductSerializer
# Create your views here.
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