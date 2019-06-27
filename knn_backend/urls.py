from django.conf.urls import url
from django.urls import path
from django.contrib.auth.views import LoginView, LogoutView
from rest_framework.urlpatterns import format_suffix_patterns
from . import views

# ----------URL'S AVAILABLE FOR ACTIVITIES RELATED TO USER MODEL SPECIFICALLY-------------
app_name = 'knn_backend'
urlpatterns = [
    # path('stock_detail/', views.StockList.as_view()),
    path('items/with_relations', views.ItemListWithRelations.as_view()),
    path('items', views.ItemList.as_view()),
    path('items/<int:pk>', views.ItemDetail.as_view()),
    path('items/bulk_update', views.ItemListBulkUpdate.as_view()),
    path('labels', views.LabelList.as_view()),
    path('labels/<int:pk>', views.LabelDetail.as_view()),
    path('clear_db',views.clear_db)
]
urlpatterns = format_suffix_patterns(urlpatterns)
