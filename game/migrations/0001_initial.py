# Generated by Django 2.1.3 on 2018-11-28 17:23

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
                ('f1_0', models.SmallIntegerField(default=0, null=True)),
                ('f1_0_dt', models.DateTimeField(blank=True, default=None, null=True)),
                ('f1_1', models.SmallIntegerField(default=0, null=True)),
                ('f1_1_dt', models.DateTimeField(blank=True, default=None, null=True)),
                ('f1_score', models.SmallIntegerField(default=0, null=True)),
                ('f2_0', models.SmallIntegerField(default=0, null=True)),
                ('f2_0_dt', models.DateTimeField(blank=True, default=None, null=True)),
                ('f2_1', models.SmallIntegerField(default=0, null=True)),
                ('f2_1_dt', models.DateTimeField(blank=True, default=None, null=True)),
                ('f2_score', models.SmallIntegerField(default=0, null=True)),
                ('f3_0', models.SmallIntegerField(default=0, null=True)),
                ('f3_0_dt', models.DateTimeField(blank=True, default=None, null=True)),
                ('f3_1', models.SmallIntegerField(default=0, null=True)),
                ('f3_1_dt', models.DateTimeField(blank=True, default=None, null=True)),
                ('f3_score', models.SmallIntegerField(default=0, null=True)),
                ('f4_0', models.SmallIntegerField(default=0, null=True)),
                ('f4_0_dt', models.DateTimeField(blank=True, default=None, null=True)),
                ('f4_1', models.SmallIntegerField(default=0, null=True)),
                ('f4_1_dt', models.DateTimeField(blank=True, default=None, null=True)),
                ('f4_score', models.SmallIntegerField(default=0, null=True)),
                ('f5_0', models.SmallIntegerField(default=0, null=True)),
                ('f5_0_dt', models.DateTimeField(blank=True, default=None, null=True)),
                ('f5_1', models.SmallIntegerField(default=0, null=True)),
                ('f5_1_dt', models.DateTimeField(blank=True, default=None, null=True)),
                ('f5_score', models.SmallIntegerField(default=0, null=True)),
                ('f6_0', models.SmallIntegerField(default=0, null=True)),
                ('f6_0_dt', models.DateTimeField(blank=True, default=None, null=True)),
                ('f6_1', models.SmallIntegerField(default=0, null=True)),
                ('f6_1_dt', models.DateTimeField(blank=True, default=None, null=True)),
                ('f6_score', models.SmallIntegerField(default=0, null=True)),
                ('f7_0', models.SmallIntegerField(default=0, null=True)),
                ('f7_0_dt', models.DateTimeField(blank=True, default=None, null=True)),
                ('f7_1', models.SmallIntegerField(default=0, null=True)),
                ('f7_1_dt', models.DateTimeField(blank=True, default=None, null=True)),
                ('f7_score', models.SmallIntegerField(default=0, null=True)),
                ('f8_0', models.SmallIntegerField(default=0, null=True)),
                ('f8_0_dt', models.DateTimeField(blank=True, default=None, null=True)),
                ('f8_1', models.SmallIntegerField(default=0, null=True)),
                ('f8_1_dt', models.DateTimeField(blank=True, default=None, null=True)),
                ('f8_score', models.SmallIntegerField(default=0, null=True)),
                ('f9_0', models.SmallIntegerField(default=0, null=True)),
                ('f9_0_dt', models.DateTimeField(blank=True, default=None, null=True)),
                ('f9_1', models.SmallIntegerField(default=0, null=True)),
                ('f9_1_dt', models.DateTimeField(blank=True, default=None, null=True)),
                ('f9_score', models.SmallIntegerField(default=0, null=True)),
                ('f10_0', models.SmallIntegerField(default=0, null=True)),
                ('f10_0_dt', models.DateTimeField(blank=True, default=None, null=True)),
                ('f10_1', models.SmallIntegerField(default=0, null=True)),
                ('f10_1_dt', models.DateTimeField(blank=True, default=None, null=True)),
                ('f10_2', models.SmallIntegerField(default=0, null=True)),
                ('f10_2_dt', models.DateTimeField(blank=True, default=None, null=True)),
                ('f10_score', models.SmallIntegerField(default=0, null=True)),
                ('created', models.DateTimeField(null=True)),
                ('modified', models.DateTimeField(null=True)),
                ('delted', models.DateTimeField(null=True)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'db_table': 'game',
            },
        ),
    ]
