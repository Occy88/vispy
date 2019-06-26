# """
# Manages adding and removing users from groups with permissions and such
# """
#
# import json
# from functools import wraps
# from datetime import datetime, timezone
# from django.contrib.auth.models import Group, User
# from django.contrib.auth.decorators import permission_required
# from django.http import JsonResponse, HttpResponse, HttpResponseRedirect
# from django.shortcuts import render
# from django.utils.decorators import method_decorator
# from django.views import View
# from company_manager.models import Factory
# # from guardian.shortcuts import remove_perm, get_objects_for_user, assign_perm
# from django.contrib.auth.decorators import user_passes_test
#
# with open("config.json") as json_data_file:
#     data = json.load(json_data_file)
# product_states = data["product_states"]
#
# UNSUCCESSFUL_RESPONSE = {
#     'success': False,
#     'message': 'FAILURE '
# }
# SUCCESSFUL_RESPONSE = {
#     'success': True,
#     'message': 'SUCCESS'
# }
#
#
#
# class PermissionManagerPage(View):
#     """
#     Pre-requisite is that the user requesting the addition
#     needs to be in said group and the permission giving group.
#     """
#
#     def post(self, request):
#         """
#         :param request: group_id_list, user_id_list, factory_id_list
#         :return:
#         """
#
#         return render(request, 'permission_manager.html', context={})
#
#     # @permission_required("delete_user")
#     @method_decorator(permission_required("change_group"))
#     def get(self, request):
#         """
#                :param request: group_id_list, user_id_list, factory_id_list
#                :return:
#                """
#
#         return render(request, 'permission_manager.html', context={})
