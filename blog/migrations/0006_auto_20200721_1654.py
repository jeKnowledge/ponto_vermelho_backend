# Generated by Django 3.0.7 on 2020-07-21 15:54

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0005_pedido_quantidade'),
    ]

    operations = [
        migrations.RenameField(
            model_name='pedido',
            old_name='nomeBenefeciario',
            new_name='nomeBeneficiario',
        ),
    ]
