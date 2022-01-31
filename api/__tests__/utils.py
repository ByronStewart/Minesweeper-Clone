from mixer.backend.django import Mixer

from api.models import User


def mixUser(**kwargs) -> User:
    mixer = Mixer(commit=False)
    user = mixer.blend('api.User', **kwargs)
    return User.objects.create_user(user)
