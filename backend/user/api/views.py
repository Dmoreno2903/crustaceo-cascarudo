
# Libraries
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework import status, viewsets
from rest_framework.parsers import JSONParser

# Models and serializers
from user.models import User
from user.api import serializers


# Views
class RegisterView(viewsets.ModelViewSet):
    """ Register View """
    serializer_class = serializers.UserRegisterSerializer
    queryset = User.objects.all()
    parser_classes = [JSONParser]

    # Al ser una vista para la creación de un usuario, se quitan
    # los permisos de autenticación
    def get_permissions(self):
        return []

    def create(self, request: Request) -> Response:
        """ Create a new user """
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def list(self, request, *args, **kwargs):
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)

class UserProfile(viewsets.ModelViewSet):
    serializer_class = serializers.UserSerializer
    parser_classes = [JSONParser]

    def list(self, request: Request) -> Response:
        """ Return the user profile """
        user = request.user
        return Response(self.serializer_class(user).data, status=status.HTTP_200_OK)
    

class ShoppingCartView(viewsets.ModelViewSet):
    serializer_class = serializers.ShoppingCartSerializer
    parser_classes = [JSONParser]

    def list(self, request, *args, **kwargs):
        """ Return the user shopping cart """
        serializer = self.get_serializer(request.user.shoopingcart)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def create(self, request, *args, **kwargs):
        """ Update the user shopping cart """
        serializer = self.get_serializer(
            request.user.shoopingcart,
            data=request.data, 
            partial=True,
        )

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)