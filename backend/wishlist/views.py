from django.shortcuts import render

from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Wishlist
from .serializers import WishlistSerializer


@api_view(["POST"])
def add_to_wishlist(request):

    serializer=WishlistSerializer(
        data=request.data
    )

    if serializer.is_valid():

        serializer.save()

        return Response({
            "message":"Added"
        })

    return Response(serializer.errors)

@api_view(["GET"])
def view_wishlist(request,user_id):

    wishlist=Wishlist.objects.filter(
        user_id=user_id
    )

    serializer=WishlistSerializer(
        wishlist,
        many=True
    )

    return Response(serializer.data)
@api_view(["DELETE"])
def remove_wishlist(request,id):

    item = Wishlist.objects.get(id=id)

    item.delete()

    return Response({"message":"Removed"})