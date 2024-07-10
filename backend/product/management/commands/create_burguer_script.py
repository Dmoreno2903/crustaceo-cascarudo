from django.core.management.base import BaseCommand
from product.models import Burguer

class Command(BaseCommand):
    help = 'Create a new burguer'

    def handle(self, *args, **options):
        new_burguer = Burguer.objects.create(
            score=5,
            name='Classic Burger',
            price=9.99,
            description='A delicious classic burger with cheese, lettuce, and tomato.',
            image='path/to/image.jpg',
            count=50,
            is_outstanding=True
        )

        self.stdout.write(self.style.SUCCESS(f'Successfully created burguer with ID {new_burguer.id}'))