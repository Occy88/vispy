from django.db import models
from django.conf import settings
import uuid


# Create your models here.

class State(models.Model):
    """
    Label representing a (classification) in the knn algorithm
    """
    date = models.DateField(auto_now_add=True)
    # id
    uuid = models.UUIDField(default=uuid.uuid4(), unique=True, db_index=True)
    # this what the user decides to keep as a classification function
    classification_function = models.TextField(max_length=10000)

    def __str__(self):
        return self.date.__str__()


# classification function (no need as we know the classification)
class Item(models.Model):
    """
    Item representing data point
    """
    state = models.ForeignKey(State, on_delete=models.CASCADE)
    uuid = models.UUIDField(default=uuid.uuid4(), db_index=True, unique=True)
    classification = models.TextField(max_length=100)
    data = models.TextField(max_length=5000)
    classification_cause = models.TextField(max_length=10000)
