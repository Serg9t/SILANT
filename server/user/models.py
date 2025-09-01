from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    company = models.CharField(max_length=200, blank=True)
    client = models.BooleanField(default=True)
    service_company = models.BooleanField(default=False)
    manager = models.BooleanField(default=False)

    def __str__(self):
        return self.company if self.client or self.service_company else self.username
