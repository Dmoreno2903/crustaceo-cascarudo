
# Dependencies
from user import models
from product.models import PARSER
from rest_framework import serializers
from rest_framework import exceptions

class UserSerializer(serializers.ModelSerializer):
    """ Serializer for the User """

    class Meta:
        model = models.User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'phone', 'address', 'birthdate', 'type']
        read_only_fields = ['id', 'username', 'email', 'first_name', 'last_name', 'phone', 'address', 'birthdate', 'type']


class ShoppingCartSerializer(serializers.ModelSerializer):
    """ Serializer for the Shopping Cart """

    class Meta:
        model = models.ShoppingCart
        fields = ['length', 'total', 'products']
        read_only_fields = ['id', 'length', 'total', 'created_at', 'updated_at']
    
    def validate(self, attrs):
        """ 
        Validate the input data based on the request method 

        :param attrs: The input data
        """
        request = self.context.get('request')
        if request and request.method == 'POST':
            # Only validate 'products' field for POST requests
            if 'products' not in attrs:
                raise serializers.ValidationError(
                    {'products': 'This field is required.'}
                )
            
            # Check if the products are valid
            if not isinstance(attrs['products'], dict):
                raise serializers.ValidationError(
                    {'products': 'Invalid data type.'}
                )
            
            # Check if the products exist
            for key, value in attrs['products'].items():
                if not isinstance(value, int) or value < 0:
                    raise serializers.ValidationError(
                        {'products': f'{value} is not a valid quantity.'}
                    )
                
                model = PARSER.get(key[0:3])
                if not model:
                    raise serializers.ValidationError(
                        {'products': f'{key[0:3]} is not a valid product.'}
                    )
                
                if not model.objects.filter(id=key).exists():
                    raise serializers.ValidationError(
                        {'products': f'{key} does not exist.'}
                    )
        
        return super().validate(attrs)


class UserRegisterSerializer(serializers.ModelSerializer):
    """ Serializer for the User Register """

    class Meta:
        model = models.User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def validate(self, attrs):
        """ Validate the input data """
        # Check if the username already exists
        if models.User.objects.filter(username=attrs.get('username')).exists():
            raise serializers.ValidationError({'username': 'This username already exists'})
        
        # Check if the email already exists
        if models.User.objects.filter(email=attrs.get('email')).exists():
            raise serializers.ValidationError({'email': 'This email already exists'})

        return attrs

    def create(self, validated_data):
        """ Create a new user """
        # Remove password from validated_data to avoid duplication
        password = validated_data.pop('password', None)
        
        # Create the user
        user = models.User.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name']
        )

        # Set the password
        if password:
            user.set_password(password)
            user.save()  # Save to ensure the password is hashed
        
        return user
