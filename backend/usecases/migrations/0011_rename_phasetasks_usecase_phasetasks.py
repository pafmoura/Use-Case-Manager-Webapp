# Generated by Django 5.0.4 on 2024-05-07 12:05

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('usecases', '0010_remove_usecase_logsources'),
    ]

    operations = [
        migrations.RenameField(
            model_name='usecase',
            old_name='PhaseTasks',
            new_name='phaseTasks',
        ),
    ]
