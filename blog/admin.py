from django.contrib import admin
from django.contrib.auth.models import Group
from .models import Instituicao, Produto, Pedido, RequestedPerson, RequestedProduct

admin.site.site_header = "Página de Administrador"
admin.site.site_title = "Página de Administrador"
admin.site.index_title = "Página de Administrador"

class AdminPedido(admin.ModelAdmin):
    list_display = ["equipa", "estadoPedido", "createdAt"]

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

    def has_change_permission(self, request, obj=None):
        return False

class AdminProduto(admin.ModelAdmin):
    list_display = ["tipoProduto"]

    def has_delete_permission(self, request, obj=None):
        return False

class AdminUser(admin.ModelAdmin):
    list_display = ["instituicao", "email", "aceite"]
    actions = ['acceptance', 'unacceptance']

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
