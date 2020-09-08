from rest_framework import serializers
from .models import Tool


class ToolSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tool
        fields = ('id', 'name')

    def create(self, validated_data):
        """
        Create and return a new `supplier` instance, given the validated data.
        """
        tool = Tool.objects.create(**validated_data)
        return tool
