from configuration import settings
from django.core.mail import EmailMessage

class Email:
    def __init__(self, to: str):
        self.to: list = [to]

    def set_subject(self, subject: str):
        self.subject = subject
    
    def set_body(self, body: str):
        self.body = body
    
    def send(self):
        email = EmailMessage(
            subject=self.subject,
            body=self.body,
            to=self.to,
        )
        email.send()