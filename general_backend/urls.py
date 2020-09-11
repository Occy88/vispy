from django.conf.urls import url
from django.urls import path
from django.contrib.auth.views import LoginView, LogoutView
from rest_framework.urlpatterns import format_suffix_patterns
from . import views

# ----------URL'S AVAILABLE FOR ACTIVITIES RELATED TO USER MODEL SPECIFICALLY-------------
app_name = 'general_backend'
urlpatterns = [
    # path('stock_detail/', views.StockList.as_view()),
    path('shapley', views.Shapley.as_view()),
    path('permutation_feature_importance', views.PermutationFeatureImportance.as_view()),
    path('results', views.Results.as_view()),
    path('get_eval_nodes', views.GetNodes.as_view()),

    path('directional_freature_contribution', views.DirectionalFeatureContribution.as_view()),

    path('items', views.ItemList.as_view()),
    path('items/<int:pk>', views.ItemDetail.as_view()),
    path('states', views.StateList.as_view()),
    path('states/<int:pk>', views.StateDetail.as_view()),
    path('clear_db',views.clear_db)
]
urlpatterns = format_suffix_patterns(urlpatterns)
