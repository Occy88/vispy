from django.conf.urls import url
from django.urls import path
from django.contrib.auth.views import LoginView, LogoutView
from rest_framework.urlpatterns import format_suffix_patterns
from . import views

# ----------URL'S AVAILABLE FOR ACTIVITIES RELATED TO USER MODEL SPECIFICALLY-------------
app_name = 'general_backend'
urlpatterns = [
    # path('stock_detail/', views.StockList.as_view()),

]
urlpatterns = format_suffix_patterns(urlpatterns)
