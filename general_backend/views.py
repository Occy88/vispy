from .models import Item, State
from .serializers import ItemSerializer, StateSerializer
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
            # print(data)
            queryset = queryset.filter(**data)
            print(queryset)

        print("RETURNING THE SHIT YOU WANTED")
        return queryset

    def create(self, request, *args, **kwargs):
        # set the product to the oneDjangoModelPermissions that was verified in the url to avoid shinanigans
        # print(request.data['items'])
        serializer = self.get_serializer(data=request.data["items"], many=isinstance(request.data["items"], list))
        # print(serializer)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class ItemDetail(generics.RetrieveUpdateAPIView):
    serializer_class = ItemSerializer

    permission_classes = (CheckApiKey,)

    def get_queryset(self):
        return Item.objects.all()


class StateList(generics.ListCreateAPIView):
    serializer_class = StateSerializer

    permission_classes = (CheckApiKey,)

    def get_queryset(self):
        """
        Only returns the query set for said company
        :return:
        """
        queryset = State.objects.all()

        if self.request.method == "GET":
            data = query_to_dict_clean(self.request.query_params)
            data.pop('API_KEY')
            queryset = queryset.filter(**data)

        return queryset

    def create(self, request, *args, **kwargs):
        print(request.data)
        #
        # # set the product to the oneDjangoModelPermissions that was verified in the url to avoid shinanigans
        # serializer = self.get_serializer(data=request.data['labels'], many=isinstance(request.data['labels'], list))
        # serializer.is_valid(raise_exception=True)
        # self.perform_create(serializer)
        # headers = self.get_success_headers(serializer.data)
        # return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class StateDetail(generics.RetrieveUpdateAPIView):
    serializer_class = StateSerializer
    permission_classes = (CheckApiKey,)

    def get_queryset(self):
        return State.objects.all()


def clear_db(request):
    """
    delete a user by id
    :param request:
    :return:
    """
    print("DELTING DATABASE: ")
    Item.objects.all().delete()
    State.objects.all().delete()
