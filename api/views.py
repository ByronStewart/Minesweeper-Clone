from django.shortcuts import render
from rest_framework.generics import CreateAPIView, ListCreateAPIView
from api.models import MinesweeperScore, User
from api.permissions import IsOwnerOrReadOnly
from api.serializers import MinesweeperScoreSerializer, RegisterSerializer, UsernameTokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticatedOrReadOnly


# Create your views here.


class LoginView(TokenObtainPairView):
    serializer_class = UsernameTokenObtainPairSerializer


class LoginRefreshTokenView(TokenRefreshView):
    # serializer_class = UsernameTokenObtainPairSerializer
    pass


class RegisterView(CreateAPIView):
    model = User
    serializer_class = RegisterSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        headers = self.get_success_headers(serializer.data)
        refresh = UsernameTokenObtainPairSerializer.get_token(
            serializer.instance)
        token = {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }

        return Response(token, status=status.HTTP_201_CREATED, headers=headers)


class MinesweeperScoreListCreateView(ListCreateAPIView):
    model = MinesweeperScore
    serializer_class = MinesweeperScoreSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)
    queryset = MinesweeperScore.objects.all()

    def create(self, request):
        serializer_context = {
            'owner': request.user,
            'request': request
        }
        serializer_data = request.data.get('score', {})
        serializer = self.serializer_class(
            data=serializer_data,
            context=serializer_context
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
