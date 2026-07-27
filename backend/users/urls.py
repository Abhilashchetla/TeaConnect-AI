from django.urls import path
from .views import (
    register_user,
    profile,
    update_profile
)

urlpatterns = [

    path('register/',register_user),
    path('profile/',profile),
    path("profile/update/", update_profile),

]
