# Generated by Django 5.0.4 on 2024-05-07 11:54

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('usecases', '0006_rename_cncs_usecase_cncstype_remove_usecase_mid_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='usecase',
            name='components',
        ),
        migrations.RemoveField(
            model_name='usecase',
            name='datasources',
        ),
        migrations.RemoveField(
            model_name='usecase',
            name='platforms',
        ),
        migrations.RemoveField(
            model_name='usecase',
            name='url',
        ),
    ]
