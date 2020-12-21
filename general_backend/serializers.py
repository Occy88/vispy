from rest_framework import serializers

#
# class StateSerializer(serializers.ModelSerializer):
#     """
#     possible labels
#     """
#
#     class Meta:
#         model = Label
#         fields = ('id','uuid', 'date', 'classification_function')
#
#
# class ItemSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Item
#         fields = ('id','uuid', 'state',  'classification', 'data')
