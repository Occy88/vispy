import json
from pydoc import locate

from django.conf import settings
from django.contrib.auth.models import AnonymousUser
from django.core import serializers
from django.shortcuts import render
from django.views import View
from rest_framework import generics

from accounts.models import Profile
from .models import Tool
from .serializers import ToolSerializer


# Create your views here.

class ServeApp(View):
    def get(self, request):
        default_company = locate(settings.COMPANY_INSTANCE).objects.get(name='Seclea')
        default_company_obj = json.loads(serializers.serialize('json', [default_company, ]))[0]
        default_company_obj.update({'id': default_company_obj['pk']})
        if type(request.user == AnonymousUser):
            return render(request, '../templates/root.html',
                          context={
                              "language": json.dumps('en-us'),
                              "choices": json.dumps(settings.LANGUAGES),
                              "company": json.dumps(default_company_obj)})
        try:
            profile = request.user.profile
        except Exception as e:
            profile = Profile.objects.create(user=request.user)
        if (profile.company == None):
            profile.company = default_company
            company_obj = default_company_obj
            profile.save()
        else:
            company_obj = json.loads(serializers.serialize('json', [profile.company, ]))[0]
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
