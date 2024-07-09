from django.core.management.base import BaseCommand
from product.models import Burguer
from faker import Faker

class Command(BaseCommand):
    help = 'Create fake burguers'

    def handle(self, *args, **options):
        fake = Faker()

        for _ in range(10):
            Burguer.objects.create(
                score=fake.random_int(min=1, max=5),
                name=fake.word(),
                price=fake.random_number(digits=2),
                description=fake.sentence(),
                image=fake.image_url(),
                count=fake.random_number(digits=2)
            )

        self.stdout.write(self.style.SUCCESS('Successfully created fake burguers'))