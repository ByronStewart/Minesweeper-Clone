from django.test import TestCase
from mixer.backend.django import mixer
from ..models import User, MinesweeperScore


class TestMinesweeperScore(TestCase):
    def test_model_creates_with_default_createdat_field(self):
        user = mixer.blend("api.User")
        score = MinesweeperScore.objects.create(
            difficulty='advanced', time=5, owner=user)
        self.assertEqual(MinesweeperScore.objects.all().count(), 1)

    def test_model_requires_difficulty_user_and_time(self):
        user = mixer.blend("api.User")

        with self.assertRaises(Exception):
            missing_time = MinesweeperScore.objects.create(
                difficulty='advanced', owner=user)

        with self.assertRaises(Exception):
            missing_difficulty = MinesweeperScore.objects.create(
                time=5, owner=user)

        with self.assertRaises(Exception):
            missing_user = MinesweeperScore.objects.create(
                difficulty='advanced', time=5)

    def test_model_only_allows_listed_difficulty_choices(self):
        with self.assertRaises(Exception):
            invalid_difficulty = MinesweeperScore.objects.create(
                difficulty='adnced', time=5)
