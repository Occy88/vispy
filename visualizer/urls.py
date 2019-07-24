from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from . import views
from django.urls import re_path


# ----------URL'S AVAILABLE FOR ACTIVITIES RELATED TO USER MODEL SPECIFICALLY-------------
app_name = 'visualizer'
urlpatterns = [
    # path('stock_detail/', views.StockList.as_view()),
    re_path('.*', views.RegisterDelivery.as_view()),

]
urlpatterns = format_suffix_patterns(urlpatterns)
