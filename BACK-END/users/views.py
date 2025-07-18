from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from django.core.mail import send_mail
from .models import User
from .serializers import UserSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    @action(detail=True, methods=['post'])
    def send_email(self, request, pk=None):
        user = self.get_object()
        subject = "Votre Matricule"
        message = "Bonjour {user.name}, voici votre Matricule : {user.matricule}"
        send_mail(subject, message, 'your_email@example.com', [user.email])
        return Response({"status": "email sent"})

