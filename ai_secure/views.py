from django.shortcuts import redirect
from .default_database_objects import *


def login_redirect(request):
    return redirect('/accounts/login/')


def home_redirect(request):
    return redirect('frontend:home')


def view_404(request, exception):
    # make a redirect to homepage
    print("REDIRECTING HOME VIEW NOT FOUND")
    # you can use the name of url or just the plain link
    return redirect('frontend:home')  # or redirect('name-of-index-url')
