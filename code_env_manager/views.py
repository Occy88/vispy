import os

from django.http.response import JsonResponse
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import generics, permissions, status, viewsets

from .helper import query_to_dict_clean



class FileDetail(generics.UpdateAPIView):
    def get(self, request, *args, **kwargs):
        print("FILE REQUESTED")
        data = query_to_dict_clean(self.request.query_params)
        print(data)
        file = data['file']
        path = data['path']
        full = path + '/' + file
        if not os.path.exists(path):
            os.makedirs(path)
        f = open(full, 'r').read()
        return JsonResponse({'file': f, 'path': path})

    def post(self, request, *args, **kwargs):
        print("RECIEVED FILE: ")
        print(request.data)
        data = request.data
        file = data['file']
        file_data = data['data']
        path = data['path']
        f = open(path + '/' + file, 'w+')
        f.write(file_data)
        JsonResponse({'success': True})
        print(data)

        return JsonResponse({"success": True})
        # else:
        #     return Response(status=status.HTTP_400_BAD_REQUEST)
