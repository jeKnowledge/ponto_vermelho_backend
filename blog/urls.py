from django.urls import path
from . import views
#from django.contrib.auth import views as auth_views

urlpatterns = [
    path('', views.Login.as_view(), name = 'login'),
    path('registo/', views.Register.as_view(), name = 'register'),
    path('tipopedido/', views.typeOrder, name = 'type_order'),
    path('identificacaopessoas/', views.personId, name = 'person_id'),
    path('beneficiario/', views.RecipientInfo.as_view(), name = 'recipient_info'),
    path('pedido/', views.Order.as_view(), name = 'order'),
    path('estadopedidos/', views.OrderPage.as_view(), name = 'order_page'),
    path('logout/', views.signOut, name = 'logout'),
]