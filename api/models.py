from statistics import mode
from django.db import models
from django.contrib.auth.models import AbstractUser, PermissionsMixin, UserManager
from django.utils import timezone

# Create your models here.


class User(AbstractUser, PermissionsMixin):
    username = models.CharField(db_index=True, max_length=255, unique=True)
    email = models.EmailField(db_index=True, unique=True, blank=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    objects = UserManager()


class MinesweeperScore(models.Model):
    difficulty = models.CharField(max_length=255, blank=False, choices=[
        (1, "beginner"),
        (2, "intermediate"),
        (3, "advanced")
    ])
    time = models.IntegerField(blank=False)
    owner = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='minesweeper_scores')
    created_at = models.DateTimeField(default=timezone.now)

    class Meta:
        ordering = ('time',)
