# Generated by Django 2.1.3 on 2018-11-27 03:39

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('game', '0003_auto_20181107_1135'),
    ]

    operations = [
        migrations.RenameField(
            model_name='game',
            old_name='user_id',
            new_name='user',
        ),
    ]
