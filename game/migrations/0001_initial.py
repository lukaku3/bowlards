# Generated by Django 2.0.9 on 2018-11-02 15:45

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Game',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('f1_0', models.SmallIntegerField(default=0)),
                ('f1_1', models.SmallIntegerField(default=0)),
                ('f2_0', models.SmallIntegerField(default=0)),
                ('f2_1', models.SmallIntegerField(default=0)),
                ('f3_0', models.SmallIntegerField(default=0)),
                ('f3_1', models.SmallIntegerField(default=0)),
                ('f4_0', models.SmallIntegerField(default=0)),
                ('f4_1', models.SmallIntegerField(default=0)),
                ('f5_0', models.SmallIntegerField(default=0)),
                ('f5_1', models.SmallIntegerField(default=0)),
                ('f6_0', models.SmallIntegerField(default=0)),
                ('f6_1', models.SmallIntegerField(default=0)),
                ('f7_0', models.SmallIntegerField(default=0)),
                ('f7_1', models.SmallIntegerField(default=0)),
                ('f8_0', models.SmallIntegerField(default=0)),
                ('f8_1', models.SmallIntegerField(default=0)),
                ('f9_0', models.SmallIntegerField(default=0)),
                ('f9_1', models.SmallIntegerField(default=0)),
                ('f10_0', models.SmallIntegerField(default=0)),
                ('f10_1', models.SmallIntegerField(default=0)),
                ('f10_2', models.SmallIntegerField(default=0)),
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'db_table': 'game',
            },
        ),
    ]