from urllib import response
from django.test import TestCase
from mixer.backend.django import mixer

from api.models import MinesweeperScore, User
from ..views import LoginRefreshTokenView, LoginView, MinesweeperScoreListCreateView, RegisterView
from rest_framework.test import APIRequestFactory, force_authenticate
from rest_framework import status


class TestLoginView(TestCase):
    @classmethod
    def setUpTestData(cls):
        cls.view = LoginView.as_view()
        cls.req = cls.req = APIRequestFactory().post("/", {
            "email": "test@gmail.com",
            "password": "password"
        })

    def test_it_should_return_a_token_when_credentials_are_correct(self):
        user = mixer.blend("api.User", email="test@gmail.com")
        user.set_password("password")
        user.save()
        response = self.view(self.req)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("access", response.data)
        self.assertIn("refresh", response.data)

    def test_it_should_return_401_if_user_does_not_exist(self):
        response = self.view(self.req)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_it_should_return_401_if_password_does_not_match(self):
        user = mixer.blend("api.User", email="test@gmail.com")
        user.set_password("not_the_password")
        user.save()
        response = self.view(self.req)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)


class TestRegisterView(TestCase):
    @classmethod
    def setUpTestData(cls):
        cls.view = RegisterView.as_view()
        cls.req = APIRequestFactory().post(path="/", data={
            "username": "test",
            "email": "test@gmail.com",
            "password": "password"
        })

    def test_it_creates_a_user(self):
        response = self.view(self.req)
        user_count = User.objects.all().count()
        self.assertEqual(user_count, 1)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_it_hashes_the_password(self):
        response = self.view(self.req)
        user = User.objects.get(username='test')
        self.assertTrue(user.check_password("password"))

    def test_it_does_not_create_if_username_already_exists(self):
        existingUser = mixer.blend("api.User", username="test")
        response = self.view(self.req)
        user_count = User.objects.all().count()
        self.assertEqual(user_count, 1)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_it_does_not_create_if_email_already_exists(self):
        existingUser = mixer.blend("api.User", email="test@gmail.com")
        response = self.view(self.req)
        user_count = User.objects.all().count()
        self.assertEqual(user_count, 1)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_it_requires_a_username_email_and_password(self):
        username_missing_request = APIRequestFactory().post(path="/", data={
            "email": "test@gmail.com",
            "password": "password"
        })
        username_missing_response = self.view(username_missing_request)
        self.assertEqual(username_missing_response.status_code,
                         status.HTTP_400_BAD_REQUEST)

        email_missing_request = APIRequestFactory().post(path="/", data={
            "username": "test",
            "password": "password"
        })
        email_missing_response = self.view(email_missing_request)
        self.assertEqual(email_missing_response.status_code,
                         status.HTTP_400_BAD_REQUEST)

        password_missing_request = APIRequestFactory().post(path="/", data={
            "username": "test",
            "email": "test@gmail.com",
        })
        password_missing_response = self.view(password_missing_request)
        self.assertEqual(password_missing_response.status_code,
                         status.HTTP_400_BAD_REQUEST)

    def test_it_returns_a_token(self):
        response = self.view(self.req)
        self.assertIn("access", response.data)
        self.assertIn("refresh", response.data)


class TestMinesweeperScoreListCreateView(TestCase):
    @classmethod
    def setUpTestData(cls):
        cls.view = MinesweeperScoreListCreateView.as_view()

    def test_post_creates_a_score_when_provided_a_valid_score(self):
        request = APIRequestFactory().post("/", data={
            'score': {
                'time': 5,
                'difficulty': 3
            }
        }, format='json')
        user = mixer.blend("api.User")
        force_authenticate(request, user)

        response = self.view(request)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(MinesweeperScore.objects.count(), 1)

    def test_post_requires_user_to_be_authorized(self):
        request = APIRequestFactory().post("/", data={
            'score': {
                'time': 5,
                'difficulty': 3
            }
        }, format='json')
        response = self.view(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_get_returns_list_of_scores(self):
        for _ in range(5):
            mixer.blend("api.MinesweeperScore")
        request = APIRequestFactory().get("/")
        response = self.view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
