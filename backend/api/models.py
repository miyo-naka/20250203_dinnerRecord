from django.db import models

# Create your models here.
class DinnerRecord(models.Model):
    date = models.DateField()
    dish_name = models.CharField(max_length=255)
    description = models.TextField(blank=True)

    def __str__(self):
        return f"{self.dish_name} on {self.date}"