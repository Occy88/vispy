from django.conf.urls import url
from django.urls import path
from django.contrib.auth.views import LoginView, LogoutView
from django.urls import reverse
from . import views
# from accounts.views.group import PermissionManagerPage
from django.contrib.auth import views as auth_views
# ----------URL'S AVAILABLE FOR ACTIVITIES RELATED TO USER MODEL SPECIFICALLY-------------
app_name = 'accounts'
urlpatterns = [
    url(r'^login/$', LoginView.as_view(), {'template_name': 'accounts/templates/registration/login.html'},
        name='login'),
    url(r'^logout/$', LogoutView.as_view(), {'template_name': 'accounts/templates/registration/logout.html'},
        name='logout'),
    # we are using object level permissions, so need to provide id of the object to which the
    path('languages', views.LanguageChoices.as_view()),
    path('languages/current', views.CurrentLanguage.as_view()),
    path('user_list',views.UserList.as_view()),
    path('user_detail/<int:pk>',views.UserDetail.as_view()),
    path('group_list', views.GroupList.as_view()),
    path('group_detail', views.GroupDetail.as_view()),
]
