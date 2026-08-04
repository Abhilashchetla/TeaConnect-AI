from django.urls import path

from .views import (
    register_user,
    profile,
    update_profile,
    delivery_agents,
)


urlpatterns = [

    # Register
    path(
        "register/",
        register_user
    ),

    # Profile
    path(
        "profile/",
        profile
    ),

    # Update Profile
    path(
        "profile/update/",
        update_profile
    ),

    # Delivery Agents
    path(
        "delivery-agents/",
        delivery_agents
    ),

]