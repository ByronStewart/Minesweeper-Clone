from django.shortcuts import render
from rest_framework.generics import CreateAPIView
from api.models import User
from api.serializers import RegisterSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework import status

# Create your views here.


class RegisterView(CreateAPIView):
    model = User
    serializer_class = RegisterSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        headers = self.get_success_headers(serializer.data)
        refresh = RefreshToken.for_user(serializer.instance)

        token = {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }

        return Response(token, status=status.HTTP_201_CREATED, headers=headers)
