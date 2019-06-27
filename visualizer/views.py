from django.shortcuts import render
from django.views import View
from django.conf import settings
# from accounts.models import Profile
import json


# Create your views here.

class RegisterDelivery(View):
    def get(self, request):
        # print(request.user)
        # try:
        #     request.user.profile
        # except Exception as e:
        #     Profile.objects.create(user=request.user)
        #     print("User had no profile, new created")
        print(request.user)
        return render(request, 'visualizer/templates/RegisterDelivery.html',
                      context={"language": "en-us", "choices": ["en-us", "it", "fr"]})
