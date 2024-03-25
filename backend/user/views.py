
# Libraries
from rest_framework import status
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

# Models
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

            # Create the client
            client = Client.objects.create(
                first_name=request.data.get('first_name'),
                last_name=request.data.get('last_name'),
                email=request.data.get('email'),
                phone=request.data.get('phone'),
                username=request.data.get('username'),
                password=request.data.get('password')
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
            administrator = Administrator.objects.create(
                first_name=request.data.get('first_name'),
                last_name = request.data.get('last_name'),
                email = request.data.get('email'),
                username = request.data.get('username'),
                password = request.data.get('password')
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

        # Define the user
        user = None

        try:
            # Get the data
            username = request.data.get('username')
            password = request.data.get('password')

            # Verify if the user exists
            try:
                user = Client.objects.get(username=username, password=password)
                user_type = 'Client'

            except Exception as NotIsClient:
                user = Administrator.objects.get(username=username, password=password)
                user_type = 'Administrator'

            if user:
                return Response({'message': 'User authenticated successfully', 'user': user.username, 'type': user_type}, status=status.HTTP_200_OK)
            else:
                return Response({'message': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)

        except user.DoesNotExist:
            return Response({'message': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

        except Exception as e:
            return Response({'message': str(e)}, status=status.HTTP_400_BAD_REQUEST)
