from rest_framework import serializers
from .models import Supplier, SupplierProduct,RestockRequest

class SupplierSerializer(serializers.ModelSerializer):

    class Meta:
        model = Supplier
        fields = '__all__'


class SupplierProductSerializer(
    serializers.ModelSerializer
):

    class Meta:
        model = SupplierProduct
        fields = '__all__'

class RestockRequestSerializer(
    serializers.ModelSerializer
):

    class Meta:
        model = RestockRequest
        fields = '__all__'