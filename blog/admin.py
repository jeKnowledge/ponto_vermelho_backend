from django.contrib import admin
from .models import Instituicao, Produto, Pedido, RequestedPerson, RequestedProduct


class MyModelAdmin(admin.ModelAdmin):
    def change_view(self, request, object_id, form_url='', extra_context=None):
        self.object_id = object_id
        return self.changeform_view(request, object_id, form_url, extra_context)

    def formfield_for_manytomany(self, db_field, request, **kwargs):
        if db_field.name == "listProducts":
            kwargs["queryset"] = Pedido.objects.get(id=self.object_id).listProducts
        if db_field.name == "listPeople":
            kwargs["queryset"] = Pedido.objects.get(id=self.object_id).listPeople
        return super().formfield_for_manytomany(db_field, request, **kwargs)
# Register your models here.
admin.site.register(Instituicao)
admin.site.register(Produto)
admin.site.register(Pedido, MyModelAdmin)
admin.site.register(RequestedProduct)
admin.site.register(RequestedPerson)
