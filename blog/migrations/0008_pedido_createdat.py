# Generated by Django 3.1.1 on 2020-10-07 02:41

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0007_auto_20201007_0213'),
    ]

    operations = [
        migrations.AddField(
            model_name='pedido',
            name='createdAt',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
    ]
