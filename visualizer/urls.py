from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from . import views
from django.urls import re_path
from django.conf.urls import url


# ----------URL'S AVAILABLE FOR ACTIVITIES RELATED TO USER MODEL SPECIFICALLY-------------
app_name = 'visualizer'
urlpatterns = [
    path('tools/', views.ToolList.as_view()),
    path('tools/<int:pk>', views.ToolDetail.as_view()),
    re_path('.*', views.ServeApp.as_view(), name='home'),
]
urlpatterns = format_suffix_patterns(urlpatterns)
