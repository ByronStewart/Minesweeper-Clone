from rest_framework.serializers import ModelSerializer

from api.models import Users


class RegisterSerializer(ModelSerializer):

    class Meta:
        model = Users
        fields = ('username', 'password', 'email')

    def create(self, validated_data):
        return Users.objects.create_user(**validated_data)
