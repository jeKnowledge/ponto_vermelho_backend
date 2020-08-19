# Generated by Django 3.0.7 on 2020-08-11 13:05

from django.conf import settings
import django.contrib.auth.models
import django.contrib.auth.validators
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0011_update_proxy_permissions'),
    ]

    operations = [
        migrations.CreateModel(
            name='Instituicao',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('username', models.CharField(error_messages={'unique': 'A user with that username already exists.'}, help_text='Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.', max_length=150, unique=True, validators=[django.contrib.auth.validators.UnicodeUsernameValidator()], verbose_name='username')),
                ('first_name', models.CharField(blank=True, max_length=30, verbose_name='first name')),
                ('last_name', models.CharField(blank=True, max_length=150, verbose_name='last name')),
                ('is_staff', models.BooleanField(default=False, help_text='Designates whether the user can log into this admin site.', verbose_name='staff status')),
                ('is_active', models.BooleanField(default=True, help_text='Designates whether this user should be treated as active. Unselect this instead of deleting accounts.', verbose_name='active')),
                ('date_joined', models.DateTimeField(default=django.utils.timezone.now, verbose_name='date joined')),
                ('instituicao', models.CharField(max_length=100)),
                ('publicoAlvo', models.CharField(default='população sem abrigo', max_length=100)),
                ('areaGeografica', models.CharField(max_length=300)),
                ('telefone', models.IntegerField(unique=True)),
                ('email', models.EmailField(max_length=300, unique=True)),
                ('aceite', models.BooleanField(default=False)),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.Group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.Permission', verbose_name='user permissions')),
            ],
            options={
                'verbose_name': 'user',
                'verbose_name_plural': 'users',
                'abstract': False,
            },
            managers=[
                ('objects', django.contrib.auth.models.UserManager()),
            ],
        ),
        migrations.CreateModel(
            name='Produto',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('tipoProduto', models.CharField(max_length=150, unique=True)),
                ('quantidadeMaxima', models.IntegerField()),
                ('tamanhosPossiveisAdulto', models.CharField(default='', max_length=300)),
                ('tamanhosPossiveisCriança', models.CharField(default='', max_length=300)),
                ('tamanhosPossiveis', models.CharField(default='', max_length=300)),
            ],
        ),
        migrations.CreateModel(
            name='Pedido',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('tamanho', models.CharField(default='30', max_length=10)),
                ('estadoPedido', models.CharField(choices=[['Recebido', 'Recebido'], ['Em preparação', 'Em preparação'], ['A aguardar stock', 'A aguardar stock'], ['Pronto a levantar', 'Pronto a levantar'], ['Recolhido', 'Recolhido']], default='Recebido', max_length=50)),
                ('tipoPedido', models.CharField(choices=[['Requisição interna', 'Requisição interna'], ['Individual', 'Individual'], ['Agregado', 'Agregado']], default='Individual', max_length=50)),
                ('nomeBeneficiario', models.CharField(max_length=100)),
                ('nomeTecnico', models.CharField(max_length=100)),
                ('cartaoCidadao', models.IntegerField(unique=True)),
                ('telefone', models.IntegerField(unique=True)),
                ('confirmacaoNovoPedido', models.BooleanField()),
                ('sexo', models.CharField(max_length=30)),
                ('idade', models.IntegerField()),
                ('numeroElementosAgregado', models.CharField(choices=[['1', 1], ['2', 2], ['3', 3], ['4', 4], ['5', 5], ['6', 6]], default='0', max_length=2)),
                ('quantidade', models.IntegerField(default=1)),
                ('equipa', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('produto', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='blog.Produto')),
            ],
        ),
    ]
