
# Libraries
from rest_framework import status
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

# Models
from django.contrib.auth.models import User
from .models import Administrator, Client


# Views
class ClientView(APIView):
    """
    Create the view for the Client, received the data and send it to the model

    Methods:
    - post: Create the client
    """

    # Create the client
    def post(self, request: Request) -> Response:
        """
        Create the data

        Parameters:
        - request: Request -> The request with the data

        Returns:
        - Response -> The response with the message
        """

        try:
            # Create the user
            user = User.objects.create(
                username=request.data.get('username'),
                password=request.data.get('password'),
                first_name=request.data.get('first_name'),
                last_name=request.data.get('last_name'),
                email=request.data.get('email')
            )

            # Create the client
            client = Client.objects.create(
                user=user,
                phone=request.data.get('phone'),
            )

            return Response({'message': 'Client created successfully'}, status=status.HTTP_201_CREATED)

        except Exception as e:
            # If an error occurs, return the message
            return Response({'message': str(e)}, status=status.HTTP_400_BAD_REQUEST)

class AdministratorView(APIView):
    """
    Create the view for the Administrator, received the data and send it to the model

    Methods:
    - post: Create the administrator
    """

    # Create the administrator
    def post(self, request: Request) -> Response:
        """
        Create the data

        Parameters:
        - request: Request -> The request with the data

        Returns:
        - Response -> The response with the message
        """

        try:
            # Create the user
            user = User.objects.create(
                username=request.data.get('username'),
                password=request.data.get('password'),
                first_name=request.data.get('first_name'),
                last_name=request.data.get('last_name'),
                email=request.data.get('email')
            )

            # Create the administrator
            administrator = Administrator.objects.create(
                user=user,
            )

            return Response({'message': 'Administrator created successfully'}, status=status.HTTP_201_CREATED)

        except Exception as e:
            # If an error occurs, return the message
            return Response({'message': str(e)}, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    """
    Create the view for the login, received the data and verify if the user exists
    If the user existe, obtain the user and the type of user and return the data
    """

    def post(self, request) -> Response:
        """
        Authenticate the user

        Arguments:
        - request: Request -> The request with the login credentials

        Returns:
        - Response -> The response with the message
        """
        try:
            # Get the data
            username = request.data.get('username')
            password = request.data.get('password')

            # Get the user
            user = User.objects.get(username=username, password=password)

            # Check the password
            if user.check_password(password) is False:
                return Response({'message': 'Incorrect password'}, status=status.HTTP_400_BAD_REQUEST)

            # Get the type of user
            try:
                client = Client.objects.get(user=user)
                return Response({'message': 'You are a Client'}, status=status.HTTP_200_OK)
            except Exception as notIsClient:
                administrator = Administrator.objects.get(user=user)
                return Response({'message': 'You are an Administrator'}, status=status.HTTP_200_OK)

        except User.DoesNotExist:
            return Response({'message': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

        except Exception as e:
            return Response({'message': str(e)}, status=status.HTTP_400_BAD_REQUEST)
