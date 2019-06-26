from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from . import views

# ----------URL'S AVAILABLE FOR ACTIVITIES RELATED TO USER MODEL SPECIFICALLY-------------
app_name = 'visualizer'
urlpatterns = [
    # path('stock_detail/', views.StockList.as_view()),
    path('register', views.RegisterDelivery.as_view()),

]
urlpatterns = format_suffix_patterns(urlpatterns)
