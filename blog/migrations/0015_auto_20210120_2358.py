# Generated by Django 3.1.1 on 2021-01-20 23:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0014_auto_20210120_2353'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='requestedproduct',
            name='numPeople',
        ),
        migrations.AddField(
            model_name='pedido',
            name='numPeople',
            field=models.IntegerField(default=1),
        ),
    ]