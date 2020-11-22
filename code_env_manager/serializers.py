from rest_framework import serializers
from knn_backend.models import Label, Item
from django.conf import settings
from pydoc import locate


class StateSerializer(serializers.ModelSerializer):
    """
    possible labels
    """

    class Meta:
        model = Label
        fields = ('id','uuid', 'date', 'classification_function')


class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = ('id','uuid', 'state',  'classification', 'data')
