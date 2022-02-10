from django.test import TestCase

from api.models import MinesweeperScore
from ..serializers import RegisterSerializer, MinesweeperScoreSerializer
from mixer.backend.django import mixer


class TestMinesweeperScoreSerializer(TestCase):
    def test_cannot_create_without_player_context(self):
        serializer = MinesweeperScoreSerializer(data={
            "time": 850,
            "difficulty": 1
        })
        serializer.is_valid()
        with self.assertRaises(Exception):
            serializer.save()

    def test_should_create_when_provided_player_context(self):
        serializer_context = {
            'owner': mixer.blend("api.User")
        }
        serializer = MinesweeperScoreSerializer(data={
            "time": 850,
            "difficulty": 1
        }, context=serializer_context)
        serializer.is_valid()
        serializer.save()
        self.assertEqual(MinesweeperScore.objects.count(), 1)
