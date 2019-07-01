from rest_framework import serializers
from knn_backend.models import Label, Item
from django.conf import settings
from pydoc import locate


class LabelSerializer(serializers.ModelSerializer):
    """
    possible labels
    """

    class Meta:
        model = Label
        fields = ('hash', 'name')


class ItemSerializer(serializers.ModelSerializer):
    label = LabelSerializer(many=False)

    class Meta:
        model = Item
        fields = ('hash', 'data', 'k_nearest', 'label')


class ItemSerializerWithRelations(serializers.ModelSerializer):
    # item_module = locate(settings.STOCK_ITEM_INSTANCE)
    # items = serializers.PrimaryKeyRelatedField(many=True, queryset=item_module.objects.filter(is_active=True))
    k_nearest = ItemSerializer(many=True)
    label = LabelSerializer(many=False)

    # print(items  )
    class Meta:
        model = Item
        fields = ('hash', 'data', 'k_nearest', 'label')
