# Generated by Django 3.1.5 on 2021-01-15 19:29

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Todo',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=120)),
                ('description', models.TextField()),
                ('completed', models.BooleanField(default=False)),
                ('completed_time', models.DateTimeField(blank=True, null=True)),
                ('priority', models.CharField(choices=[('high', 'High'), ('med', 'Medium'), ('low', 'Low')], max_length=4)),
                ('due_date', models.DateTimeField(blank=True, null=True)),
            ],
        ),
    ]
