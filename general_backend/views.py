from .models import Item, State
# from .serializers import ItemSerializer, StateSerializer
from rest_framework import generics, permissions
from django.conf import settings
from pydoc import locate
from rest_framework.exceptions import PermissionDenied
from .helper import query_to_dict_clean
from django.http import Http404
from rest_framework.response import Response
from rest_framework import generics, permissions, status, viewsets
from django.views import View
from django.http.response import HttpResponse, HttpResponseNotFound, JsonResponse
import json
# from .gradient_boosted_trees import gen_shap, permutation_feature_importance, directional_feature_contribution, \
#     get_results, get_eval_nodes



class CheckApiKey(permissions.BasePermission):
    def has_permission(self, request, view):
        # API_KEY should be in request headers to authenticate requests
        if 'API_KEY' in request.query_params:
            api_key_secret = request.query_params['API_KEY']

        else:
            api_key_secret = request.data.get('API_KEY')

        return api_key_secret == settings.API_KEY_SECRET

