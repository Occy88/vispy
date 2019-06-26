from knn_backend.models import Item, Label
from knn_backend.serializers import ItemSerializer, ItemSerializerWithRelations, LabelSerializer
from rest_framework import generics, permissions
from django.conf import settings
from pydoc import locate
from rest_framework.exceptions import PermissionDenied
from .helper import query_to_dict_clean
from django.http import Http404
from rest_framework.response import Response
from rest_framework import generics, permissions, status, viewsets


class ItemListWithRelations(generics.ListAPIView):
    serializer_class = ItemSerializerWithRelations
    permission_classes = (permissions.DjangoModelPermissions,)

    def get_queryset(self):
        """
        Only returns the query set for said company
        :return:
        """
        queryset = Item.objects.all()
        if self.request.method == "GET":
            data = query_to_dict_clean(self.request.query_params)
            queryset = queryset.filter(**data)
        print(queryset)
        print(self.request.data)
        return queryset


class ItemList(generics.ListCreateAPIView):
    serializer_class = ItemSerializer
    permission_classes = (permissions.DjangoModelPermissions,)

    def get_queryset(self):
        """
        Only returns the query set for said company
        :return:
        """
        queryset = Item.objects.all()

        if self.request.method == "GET":
            data = query_to_dict_clean(self.request.query_params)
            queryset = queryset.filter(**data)
        print(queryset)
        print(self.request.data)
        return queryset

    def create(self, request, *args, **kwargs):
        # set the product to the oneDjangoModelPermissions that was verified in the url to avoid shinanigans

        serializer = self.get_serializer(data=request.data, many=isinstance(request.data, list))
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class ItemDetail(generics.RetrieveUpdateAPIView):
    serializer_class = ItemSerializer
    permission_classes = (permissions.DjangoModelPermissions,)

    def get_queryset(self):
        return Item.objects.all()


class LabelList(generics.ListCreateAPIView):
    serializer_class = LabelSerializer
    permission_classes = (permissions.DjangoModelPermissions,)

    def get_queryset(self):
        """
        Only returns the query set for said company
        :return:
        """
        queryset = Label.objects.all()

        if self.request.method == "GET":
            data = query_to_dict_clean(self.request.query_params)
            queryset = queryset.filter(**data)
        print(queryset)
        print(self.request.data)
        return queryset

    def create(self, request, *args, **kwargs):
        # set the product to the oneDjangoModelPermissions that was verified in the url to avoid shinanigans

        serializer = self.get_serializer(data=request.data, many=isinstance(request.data, list))
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class LabelDetail(generics.RetrieveUpdateAPIView):
    serializer_class = LabelSerializer
    permission_classes = (permissions.DjangoModelPermissions,)

    def get_queryset(self):
        return Label.objects.all()
