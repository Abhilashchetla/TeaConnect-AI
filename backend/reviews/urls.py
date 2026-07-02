from django.urls import path
from .views import *

urlpatterns=[

path("add/",add_review),

path("product/<int:product_id>/",product_reviews),

]