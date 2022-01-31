from django.test import TestCase
from mixer.backend.django import mixer

from api.models import Users
from ..views import RegisterView
from rest_framework.test import APIRequestFactory
from rest_framework import status
from .utils import mixUser


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
        user_count = Users.objects.all().count()
        self.assertEqual(user_count, 1)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_it_hashes_the_password(self):
        response = self.view(self.req)
        user = Users.objects.get(username='test')
        self.assertTrue(user.check_password("password"))

    def test_it_does_not_create_if_username_already_exists(self):
        existingUser = mixer.blend("api.Users", username="test")
        response = self.view(self.req)
        user_count = Users.objects.all().count()
        self.assertEqual(user_count, 1)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_it_does_not_create_if_email_already_exists(self):
        existingUser = mixer.blend("api.Users", email="test@gmail.com")
        response = self.view(self.req)
        user_count = Users.objects.all().count()
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
