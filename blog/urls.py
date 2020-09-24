from django.urls import path
from . import views
#from django.contrib.auth import views as auth_views

urlpatterns = [
    path('', views.index, name = 'index'),
    path('login/', views.Login.as_view(), name = 'login'),
    path('signup/', views.Register.as_view(), name = 'signup'),
    path('request/', views.request_view, name = 'request'),
    path('estadopedidos/', views.OrderPage.as_view(), name = 'order_page'),
    path('logout/', views.signOut, name = 'logout'),
]
