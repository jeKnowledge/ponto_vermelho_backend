from django.contrib import admin
from django.contrib.auth.models import Group
from .models import Instituicao, Produto, Pedido, RequestedPerson, RequestedProduct
from django.contrib.admin import SimpleListFilter
from django.contrib.admin.actions import delete_selected
from django.utils.html import format_html

admin.site.site_header = "Página de Administrador"
admin.site.site_title = "Página de Administrador"
admin.site.index_title = "Página de Administrador"

estadoPedidos = [
    ["Recebido", "Recebido"],
    ["Em preparação", "Em preparação"],
    ["A aguardar stock", "A aguardar stock"],
    ["Pronto a levantar", "Pronto a levantar"],
    ["Recolhido", "Recolhido"]
]

class PedidoFilter(SimpleListFilter):
    title = 'Estado Pedido' # or use _('country') for translated title
    parameter_name = 'pedido'

    def lookups(self, request, model_admin):
        return [("Recebido","Recebido"),("Em preparação","Em preparação"), ("A aguardar stock", "A aguardar stock"), ("Pronto a levantar","Pronto a levantar"), ("Recolhido", "Recolhido")]

    def queryset(self, request, queryset):
        if self.value() == 'All':
            return queryset
        if self.value():
            return queryset.filter(country__id__exact=self.value())

class AdminPedido(admin.ModelAdmin):
    list_display = ["equipa", "tipoPedido","estadoPedido", "data_de_pedido", "numPeople"]
    readonly_fields = ['admin_equipa', 'tipoPedido', 'listPeople', "numPeople", "admin_products"]
    exclude=["equipa", "listProducts"]
    list_filter = (PedidoFilter,)

    def change_view(self, request, object_id, form_url='', extra_context=None):
        self.object_id = object_id
        return self.changeform_view(request, object_id, form_url, extra_context)

    def formfield_for_manytomany(self, db_field, request, **kwargs):
        if db_field.name == "listProducts":
            kwargs["queryset"] = Pedido.objects.get(id=self.object_id).listProducts
        if db_field.name == "listPeople":
            kwargs["queryset"] = Pedido.objects.get(id=self.object_id).listPeople
        return super().formfield_for_manytomany(db_field, request, **kwargs)

    def data_de_pedido(self, obj):
        return obj.createdAt.strftime("%d/%b/%Y - %H:%Mh")

    def admin_equipa(self,obj):
        url = "/admin/blog/instituicao/"+str(obj.equipa.id)
        return format_html("<a href='{url}'>{equipa}</a>", equipa=str(obj.equipa),url=url)
    admin_equipa.short_description = "Equipa"

    def admin_products(self,obj):
        products_str = ""

        for product in obj.listProducts.all():
            products_str += "<p style='color:#0181D3' ><b>" + product.produto.tipoProduto  +"</b></p><p style='margin-left:2.5em'>" +"<b>Quantidade:</b> "+ str(product.quantidade) + "</p><p style='margin-left:2.5em'>" +"<b>Tamanho:</b> " + product.tamanho+ "</p>"
        return format_html(products_str)
    admin_products.short_description = "Produtos"




    def has_add_permission(self, request):
        return False

    def has_delete_permission(self, request, obj=None):
        return False

'''
    def has_change_permission(self, request, obj=None):
        return False
'''


class AdminProduto(admin.ModelAdmin):
    list_display = ["tipoProduto"]

    def has_delete_permission(self, request, obj=None):
        return False

class AdminUser(admin.ModelAdmin):
    list_display = ["username","instituicao", "email","telefone", "aceite"]
    readonly_fields = ['username','instituicao', 'email', 'telefone','publicoAlvo', 'areaGeografica','requests']
    actions = ['acceptance', 'unacceptance']
    empty_value_display = ''
    exclude = ('last_login','is_superuser','date_joined','is_active','is_staff','groups','user_permissions','password','first_name','last_name')

    def acceptance(self, request, queryset):
        queryset.update(aceite = True)
    acceptance.short_description = "Tornar equipa como aceite"

    def unacceptance(self, request, queryset):
        queryset.update(aceite = False)
    unacceptance.short_description = "Tornar equipa como não aceite"

    def unacceptance(self, request, queryset):
        queryset.update(aceite = False)
    unacceptance.short_description = "Tornar equipa como não aceite"
    delete_selected.short_description = "Apagar equipas"

    def has_add_permission(self, request, obj=None):
        return False

    def requests(self,obj):
        requests_str = ""
        query = Pedido.objects.filter(equipa=obj).order_by("-createdAt")
        for request in query:
            requests_str += "<a href='/admin/blog/pedido/"+ str(request.id)  + "'><p>" + request.createdAt.strftime("%d/%b/%Y - %H:%Mh") + " ---- <b>" + request.estadoPedido + "</b></p>"
            for product in request.listProducts.all():
                requests_str += "<p style='margin-left:2.5em'><b>" + product.produto.tipoProduto +  "</b>  ("+str(product.quantidade)+") / "+ product.tamanho +"</p>"
            requests_str += "</a>"

        return format_html(requests_str)
    requests.short_description = "Pedidos"

# Register your models here.
admin.site.register(Instituicao, AdminUser)
admin.site.register(Produto, AdminProduto)
admin.site.register(Pedido, AdminPedido)
#admin.site.register(RequestedProduct)
#admin.site.register(RequestedPerson)
admin.site.unregister(Group)
