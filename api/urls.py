from django import views
from django.contrib import admin
from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import LoginRefreshTokenView, LoginView, RegisterView

urlpatterns = [
    path('login', LoginView.as_view(), name='login'),
    path('login/refresh', LoginRefreshTokenView.as_view(), name='login_refresh'),
    path('register', RegisterView.as_view(), name='register')
]
