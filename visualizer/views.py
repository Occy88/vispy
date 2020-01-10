from django.shortcuts import render
from django.views import View
from django.conf import settings
from accounts.models import Profile
import json
from pydoc import locate
from django.core import serializers
from rest_framework import generics
from .serializers import ToolSerializer
from .models import Tool


# Create your views here.

class ServeApp(View):
    def get(self, request):
        try:
            profile=request.user.profile
        except Exception as e:
            profile=Profile.objects.create(user=request.user)
        if (profile.company == None):
            company_obj = locate(settings.COMPANY_INSTANCE).objects.get(id=1)
            profile.company=company_obj
            profile.save()
        else:
            company_obj = json.loads(serializers.serialize('json', [request.user.profile.company, ]))[0]
            company_obj.update({'id': company_obj['pk']})
        serve_scan_page_only = request.user.groups.all().filter(name="Scan Group").__len__() is not 0
        if serve_scan_page_only:
            serve_scan_page_only = 'true'
        else:
            serve_scan_page_only = 'false'
        return render(request, '../templates/root.html',
                      context={
                          "serve_scan_page_only": serve_scan_page_only,
                          "language": json.dumps(request.user.profile.language),
                          "choices": json.dumps(settings.LANGUAGES),
                          "company": json.dumps(company_obj)})


class ToolList(generics.ListCreateAPIView):
    """
    This returns the serialized list of companies to which the user
    has permission, i.e. user checked against each company

    """
    serializer_class = ToolSerializer
    queryset = Tool.objects.all()
    # permission_classes = (permissions.DjangoModelPermissions,)

    # def get_queryset(self):
    #     """
    #     Only returns the query set for said company
    #     :return:
    #     """
    #     # can order and stuff here.
    #     # also can have permissions.
    #     return Tool.objects.all()


class ToolDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    This returns the list of shipments for a shipment site of a given supplier
    for a given company
    """
    queryset = Tool.objects.all()
    serializer_class = ToolSerializer
    # permission_classes = (CompanyPermissions, permissions.DjangoModelPermissions,)
    # parser_class = (FileUploadParser,)


