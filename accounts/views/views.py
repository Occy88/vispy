# THIS IS A PYTHON FILE FOR HANDELING GENERAL REQUESTS FROM URL'S
from hashlib import md5
from django.shortcuts import render
from django.contrib.auth.models import User
from django.http import Http404, StreamingHttpResponse, HttpResponseRedirect, HttpResponse
from django.shortcuts import reverse, redirect, get_object_or_404
from django.contrib.auth.models import Group, Permission
from django.http import JsonResponse
from django.core.mail import send_mail
from datetime import timedelta, datetime
import threading
import json
import uuid
import string

import random

with open("config.json") as json_data_file:
    data = json.load(json_data_file)

UNSUCCESSFUL_RESPONSE = {
    'success': False,
    'message': 'FAILURE '
}
SUCCESSFUL_RESPONSE = {
    'success': True,
    'message': 'SUCCESS'
}



def db_objects_to_list_of_dicts(objects):
    """
    converts multiple db objects to a list of its dictionaries
    :param objects:
    :return:
    """
    list = []
    for db_object in objects:
        list.append(db_object.to_dict())
    return list



def randomString(stringLength):
    """
    This function is coppied to generate a random string.
    (for the password)
    url: https://pynative.com/python-generate-random-string/
    :param stringLength:
    :return:
    """
    """Generate a random string of fixed length """
    letters = string.ascii_lowercase
    return ''.join(random.choice(letters) for i in range(stringLength))


def remove_user_from_group(user, group_name):
    """0 PM' does not match format '%m/%d/%Y %I:%M %p
    removes user from a group
    :param user:
    :param group_name:
    :return:
    """
    group = Group.objects.get(name=group_name)
    group.user_set.remove(user)
    if group_name == "waiter":
        user.waiter.delete()




def delete_account(request):
    """
    delete a user by id
    :param request:
    :return:
    """
    if request.method == 'POST':
        try:
            print("DELTING ACCOUNT: ", request.POST["id"])
            user = User.objects.get(id=request.POST["id"])
            user.delete()
            response = SUCCESSFUL_RESPONSE
        except Exception as e:
            print("FAILED TO CREATE USER:", e)
            response = UNSUCCESSFUL_RESPONSE



def random_date(start, end):
    """
    This function belongs to https://stackoverflow.com/questions/553303/generate-a-random-date-between-two-other-dates
    It is just used to generate random orders
    This function will return a random datetime between two datetime
    objects.
    """
    delta = end - start
    micro_seconds = 1000000 * 60 * 60 * 24 * delta.days
    random_micro = random.randrange(0, micro_seconds)
    return start + timedelta(microseconds=random_micro)


# def view_profile(request):
#     args = {'user': request.user}
#     return render(request, 'accounts/templates/registration/profile.html', args)
#
