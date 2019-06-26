from django.conf.urls import url
from django.contrib.auth.views import LoginView, LogoutView
# from accounts.views.group import PermissionManagerPage

# ----------URL'S AVAILABLE FOR ACTIVITIES RELATED TO USER MODEL SPECIFICALLY-------------
app_name = 'accounts'
urlpatterns = [
    url(r'^login/$', LoginView.as_view(), {'template_name': 'accounts/templates/registration/login.html'},
        name='login'),
    url(r'^logout/$', LogoutView.as_view(), {'template_name': 'accounts/templates/registration/logout.html'},
        name='logout'),
    # url(r'^PermissionManagerPage/$', PermissionManagerPage.as_view(), name='PermissionManagerPage'),

]
