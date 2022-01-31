from rest_framework.serializers import ModelSerializer

from api.models import User


class RegisterSerializer(ModelSerializer):

    class Meta:
        model = User
        fields = ('username', 'password', 'email')

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)
