from django.contrib import admin
from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('login', TokenObtainPairView.as_view(), name='login'),
    path('login/refresh', TokenRefreshView.as_view(), name='login_refresh'),
]
