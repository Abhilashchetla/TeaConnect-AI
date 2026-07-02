from django.shortcuts import render

from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Review
from .serializers import ReviewSerializer


@api_view(["POST"])
def add_review(request):

    serializer = ReviewSerializer(
        data=request.data
    )

    if serializer.is_valid():

        serializer.save()

        return Response({
            "message":"Review Added"
        })

    return Response(serializer.errors)


@api_view(["GET"])
def product_reviews(request,product_id):

    reviews = Review.objects.filter(
        product_id=product_id
    )

    serializer = ReviewSerializer(
        reviews,
        many=True
    )

    return Response(serializer.data)
