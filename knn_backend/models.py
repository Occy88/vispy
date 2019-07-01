from django.db import models
from django.conf import settings


# Create your models here.

class Label(models.Model):
    """
    Label representing a (classification) in the knn algorithm
    """
    hash = models.TextField(primary_key=True)
    name = models.TextField(max_length=100, null=False)

    def __str__(self):
        return self.name


class Item(models.Model):
    """
    Item representing data point
    """
    hash = models.TextField(primary_key=True)
    label = models.ForeignKey(Label, on_delete=models.CASCADE, null=False)
    # relation to multiple other items (many to many field?)
    k_nearest = models.ManyToManyField('self', symmetrical=False, null=True)
    # Data can be whatever the person decides, just made it text for now
    # but it can be an image e.t.c.
    data = models.TextField(max_length=5000)
