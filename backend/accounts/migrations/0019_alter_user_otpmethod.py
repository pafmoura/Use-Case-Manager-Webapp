# Generated by Django 5.0.4 on 2024-05-29 14:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0018_rename_otp_method_user_otpmethod'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='otpMethod',
            field=models.CharField(choices=[('email', 'Email'), ('totp', 'TOTP')], default='email', max_length=10),
        ),
    ]
