from .models import Item, State
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
from .gradient_boosted_trees import gen_shap, permutation_feature_importance, directional_feature_contribution, \
    get_results, get_eval_nodes

import os


class FileDetail(View):
    def get(self, request):
        data = query_to_dict_clean(request.GET)
        file = data['file']
        path = data['path']
        if not os.path.exists(path):
            os.makedirs(path)
        f = open(path, 'r')
        return JsonResponse({'file': f, 'path': path})

    def post(self, request):
        data = request.POST
        file = data['file']
        path = data['path']
        f = open(path, 'w+')
        f.write(file)

        print(data)
