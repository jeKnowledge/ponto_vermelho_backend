from django.contrib import admin
from django.contrib.auth.models import Group
from .models import Instituicao, Produto, Pedido, RequestedPerson, RequestedProduct
from django.contrib.admin import SimpleListFilter

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
            return queryset.filter(estadoPedido=self.value())

class AdminPedido(admin.ModelAdmin):
    list_display = ["equipa", "tipoPedido","estadoPedido", "createdAt", "numPeople"]
    readonly_fields = ['tipoPedido', 'equipa', 'listProducts', 'listPeople', "numPeople"]
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
    list_display = ["instituicao", "email", "aceite"]
    actions = ['acceptance', 'unacceptance']
    empty_value_display = ''
    exclude = ('last_login','is_superuser','date_joined','is_active','is_staff','groups','user_permissions','password','first_name','last_name')

    def acceptance(self, request, queryset):
        queryset.update(aceite = True)
    acceptance.short_description = "Tornar equipa como aceite"

    def unacceptance(self, request, queryset):
        queryset.update(aceite = False)
    unacceptance.short_description = "Tornar equipa como não aceite"

    def has_add_permission(self, request, obj=None):
        return False
    
    def has_change_permission(self, request, obj=None):
        return False

# Register your models here.
admin.site.register(Instituicao, AdminUser)
admin.site.register(Produto, AdminProduto)
admin.site.register(Pedido, AdminPedido)
#admin.site.register(RequestedProduct)
#admin.site.register(RequestedPerson)
admin.site.unregister(Group)
