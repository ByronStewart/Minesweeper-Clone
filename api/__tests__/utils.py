from mixer.backend.django import Mixer

from api.models import Users


def mixUser(**kwargs) -> Users:
    mixer = Mixer(commit=False)
    user = mixer.blend('api.Users', **kwargs)
    return Users.objects.create_user(user)
