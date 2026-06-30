from django.urls import path
from .views import *

urlpatterns = [
    path("add/", add_to_wishlist),
    path("user/<int:user_id>/", view_wishlist),
]