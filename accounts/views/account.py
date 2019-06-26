"""
Manages adding and removing users from groups with permissions and such
"""

import json
from functools import wraps
from datetime import datetime, timezone
from django.contrib.auth.models import Group, User
from django.contrib.auth.decorators import permission_required
from django.http import JsonResponse, HttpResponse, HttpResponseRedirect
from django.utils.decorators import method_decorator
from django.views import View
from company_manager.models import Factory
# from guardian.shortcuts import remove_perm, get_objects_for_user, assign_perm

with open("config.json") as json_data_file:
    data = json.load(json_data_file)
product_states = data["product_states"]

UNSUCCESSFUL_RESPONSE = {
    'success': False,
    'message': 'FAILURE '
}
SUCCESSFUL_RESPONSE = {
    'success': True,
    'message': 'SUCCESS'
}


@permission_required("delete_user")
@permission_required("change_group")
class CreateAccount(View):
    """
    Pre-requisite is that the user requesting the addition
    needs to be in said group and the permission giving group.
    """

    def post(self, request):
        """
        # As of now limitation: user cannot have different permission for different factory
        # I'm new to permissions, so this is the best I can do, will need further research, perhaps when I get better
        most of the time, this function will take only one or two users, with one-4 groups and maximum 10 factories at this stage.
        sets the permissions for a list of users according to the specified groups,
        sets permissions for the set of factories associated with the request user
        If a user is no longer associated with a factory then (list is empty and everything else is fine, then the user is deleted"

        :param request: group_id_list, user_id_list, factory_id_list
        :return:
        """

        # check if the user has permission for all factories received
        # check if user has permission change_group
        # check if user is a member of all the groups
        groups = request.user.groups.all()
        users = User.objects.filter(pk__in=request["user_id_list"])
        factory_list = Factory.objects.filter(pk__in=request["factory_id_list"])
        group_list = Group.objects.filter(pk__in=request.POST["group_id_list"])

        # factory check
        for factory in factory_list:
            if request.user.has_perm('factory_permission', factory):
                continue
            else:
                return JsonResponse(UNSUCCESSFUL_RESPONSE)
        # group check
        for group in group_list:
            if request.user in group.user_set.all():
                continue
            else:
                return JsonResponse(UNSUCCESSFUL_RESPONSE)

        # MODIFY PERMISSIONS HERE
        # clear all group memberships (that all group memberships that intersect with the request user)
        for user in users:
            user.groups.clear()
        for group in group_list:
            group.user_set.add(*users)

        # # clear all perms associated with the request user then assign the ones in the list
        # request_user_factories = get_objects_for_user(request.user, 'factory_permission')
        # for factory in request_user_factories:
        #     for user in users:
        #         remove_perm('factory_permission', user, factory)
        # for factory in factory_list:
        #     for user in users:
        #         assign_perm('factory_permission', user, factory)
        # # check if any users have no more factories associated with them, (delete if that's the case)
        # for user in users:
        #     if len(get_objects_for_user(user, 'factory_permission') <= 0):
        #         user.delete()
        # # clear all factory memberships and assign to current ones, (if list empty delete user)
        return JsonResponse(SUCCESSFUL_RESPONSE)

    def get(self, request):
        pass

