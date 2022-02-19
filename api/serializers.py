from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from api.models import MinesweeperScore, User


class RegisterSerializer(ModelSerializer):

    class Meta:
        model = User
        fields = ('username', 'password', 'email')

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)


class UsernameTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['username'] = user.username
        return token


class MinesweeperScoreSerializer(ModelSerializer):
    owner = serializers.CharField(source="owner.username", read_only=True)

    def create(self, validated_data):
        owner = self.context.get('owner', None)
        return MinesweeperScore.objects.create(owner=owner, **validated_data)

    class Meta:
        model = MinesweeperScore
        fields = ('owner', 'time', 'difficulty', 'created_at', 'id')
        read_only_fields = ('owner', 'created_at')
