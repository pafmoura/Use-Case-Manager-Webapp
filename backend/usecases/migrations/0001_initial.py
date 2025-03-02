# Generated by Django 5.0.4 on 2024-04-29 09:30

import django.contrib.postgres.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='UseCase',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('mid', models.CharField(blank=True, max_length=100, null=True)),
                ('title', models.CharField(max_length=100)),
                ('cncs', models.CharField(blank=True, max_length=100, null=True)),
                ('tactics', django.contrib.postgres.fields.ArrayField(base_field=models.CharField(blank=True, max_length=1000, null=True), blank=True, null=True, size=None)),
                ('description', models.CharField(blank=True, max_length=3000, null=True)),
                ('mitigations', django.contrib.postgres.fields.ArrayField(base_field=models.CharField(blank=True, max_length=1000, null=True), blank=True, null=True, size=None)),
                ('detections', django.contrib.postgres.fields.ArrayField(base_field=models.CharField(blank=True, max_length=1000, null=True), blank=True, null=True, size=None)),
            ],
        ),
    ]
