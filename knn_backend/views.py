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


class CheckApiKey(permissions.BasePermission):
    def has_permission(self, request, view):
        # API_KEY should be in request headers to authenticate requests
        if 'API_KEY' in request.query_params:
            api_key_secret = request.query_params['API_KEY']

        else:
            api_key_secret = request.data.get('API_KEY')

        return api_key_secret == settings.API_KEY_SECRET


class ItemListWithRelations(generics.ListAPIView):
    serializer_class = ItemSerializerWithRelations

    permission_classes = (CheckApiKey,)

    def get_queryset(self):
        """
        Only returns the query set for said company
        :return:
        """
        print("GETTING THE DATA")
        queryset = Item.objects.all().select_related('label').prefetch_related("k_nearest")
        if self.request.method == "GET":
            data = query_to_dict_clean(self.request.query_params)
            data.pop('API_KEY')
            print(data)
            if 'hash' in data:
                data['hash']=data['hash'].__str__().split('.')[0]
            queryset = queryset.filter(**data)
            print(queryset)
        print("RETURNING THe DATA")
        return queryset


class ItemList(generics.ListCreateAPIView):
    serializer_class = ItemSerializer

    permission_classes = (CheckApiKey,)

    def get_queryset(self):
        """
        Only returns the query set for said company
        :return:
        """
        queryset = Item.objects.all().prefetch_related("k_nearest")

        if self.request.method == "GET":
            print("GETTING THE SHIT YOU WANTED")
            data = query_to_dict_clean(self.request.query_params)
            data.pop('API_KEY')
            print(data)
            queryset = queryset.filter(**data)
            print(queryset)

        print("RETURNING THE SHIT YOU WANTED")
        return queryset



    def create(self, request, *args, **kwargs):
        # set the product to the oneDjangoModelPermissions that was verified in the url to avoid shinanigans

        serializer = self.get_serializer(data=request.data["items"], many=isinstance(request.data["items"], list))
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class ItemListBulkUpdate(generics.UpdateAPIView):
    serializer_class = ItemSerializer

    permission_classes = (CheckApiKey,)

    def get_queryset(self):
        """
        Only returns the query set for said company
        :return:
        """
        queryset = Item.objects.all()

        if self.request.method == "GET":
            data = query_to_dict_clean(self.request.query_params)
            data.pop('API_KEY')
            queryset = queryset.filter(**data)
        return queryset

    def post(self, request, *args, **kwargs):
        serializer = ItemSerializer(data=request.data['items'], many=True)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class ItemDetail(generics.RetrieveUpdateAPIView):
    serializer_class = ItemSerializer

    permission_classes = (CheckApiKey,)

    def get_queryset(self):
        return Item.objects.all()


class LabelList(generics.ListCreateAPIView):
    serializer_class = LabelSerializer

    permission_classes = (CheckApiKey,)

    def get_queryset(self):
        """
        Only returns the query set for said company
        :return:
        """
        queryset = Label.objects.all()

        if self.request.method == "GET":
            data = query_to_dict_clean(self.request.query_params)
            data.pop('API_KEY')
            queryset = queryset.filter(**data)

        return queryset

    def create(self, request, *args, **kwargs):
        # set the product to the oneDjangoModelPermissions that was verified in the url to avoid shinanigans
        serializer = self.get_serializer(data=request.data['labels'], many=isinstance(request.data['labels'], list))
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class LabelDetail(generics.RetrieveUpdateAPIView):
    serializer_class = LabelSerializer
    permission_classes = (CheckApiKey,)

    def get_queryset(self):
        return Label.objects.all()


def clear_db(request):
    """
    delete a user by id
    :param request:
    :return:
    """
    print("DELTING DATABASE: ")
    Item.objects.all().delete()
    Label.objects.all().delete()
