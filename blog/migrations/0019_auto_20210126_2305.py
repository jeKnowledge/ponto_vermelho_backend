# Generated by Django 3.1.1 on 2021-01-26 23:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0018_pedido_nometecnico'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='pedido',
            name='ccBenefeciario',
        ),
        migrations.RemoveField(
            model_name='pedido',
            name='nomeBenefeciario',
        ),
        migrations.RemoveField(
            model_name='pedido',
            name='nomeTecnico',
        ),
        migrations.RemoveField(
            model_name='pedido',
            name='nomeTitular',
        ),
        migrations.RemoveField(
            model_name='pedido',
            name='phoneBenefeciario',
        ),
        migrations.AddField(
            model_name='pedido',
            name='listPeople',
            field=models.ManyToManyField(blank=True, related_name='people', to='blog.RequestedPerson', verbose_name='Lista de Pessoas'),
        ),
        migrations.AddField(
            model_name='pedido',
            name='listProducts',
            field=models.ManyToManyField(related_name='products', to='blog.RequestedProduct', verbose_name='Lista de Produtos'),
        ),
    ]