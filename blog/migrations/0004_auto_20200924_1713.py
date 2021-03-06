# Generated by Django 3.1.1 on 2020-09-24 17:13

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0003_auto_20200924_1130'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='pedido',
            name='produto',
        ),
        migrations.RemoveField(
            model_name='pedido',
            name='quantidade',
        ),
        migrations.RemoveField(
            model_name='pedido',
            name='tamanho',
        ),
        migrations.AddField(
            model_name='pedido',
            name='listProducts',
            field=models.ManyToManyField(to='blog.Produto'),
        ),
        migrations.AlterField(
            model_name='instituicao',
            name='publicoAlvo',
            field=models.CharField(choices=[['População sem abrigo', 'População sem abrigo'], ['Beneficiários do Rendimento Social de Inserção', 'Beneficiários do Rendimento Social de Inserção'], ['Grávidas em situação de risco', 'Grávidas em situação de risco'], ['Vítimas de violência doméstica', 'Vítimas de violência doméstica'], ['Outros', 'Outros']], default='população sem abrigo', max_length=100),
        ),
        migrations.CreateModel(
            name='RequestedProduct',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('tamanho', models.CharField(default='30', max_length=10)),
                ('quantidade', models.IntegerField(default=1)),
                ('produto', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='blog.produto')),
            ],
        ),
    ]
