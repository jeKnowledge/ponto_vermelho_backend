from django.contrib import admin
from .models import Instituicao, Produto, Pedido

# Register your models here.
admin.site.register(Instituicao)
admin.site.register(Produto)
admin.site.register(Pedido)