from django.urls import path
from . import views
#from django.contrib.auth import views as auth_views

urlpatterns = [
    path('', views.Login.as_view(), name = 'login'),
    path('Registo/', views.Register.as_view(), name = 'register'),
    path('TipoPedido/', views.typeOrder, name = 'type_order'),
    path('Beneficiario/', views.RecipientInfo.as_view(), name = 'recipient_info'),
    path('Pedido/', views.Order.as_view(), name = 'order'),
    path('EstadoPedidos/', views.orderPage, name = 'order_page'),
    path('Logout/', views.signOut, name = 'logout'),
]