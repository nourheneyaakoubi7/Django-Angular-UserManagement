from django.db import models

class User(models.Model):
    name = models.CharField(max_length=100)
    matricule = models.CharField(max_length=20, unique=True)
    email = models.EmailField(unique=True)

    def __str__(self):
        return self.name

