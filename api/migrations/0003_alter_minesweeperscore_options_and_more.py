# Generated by Django 4.0.1 on 2022-02-09 08:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_minesweeperscore'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='minesweeperscore',
            options={'ordering': ('time',)},
        ),
        migrations.AlterField(
            model_name='minesweeperscore',
            name='difficulty',
            field=models.CharField(choices=[(1, 'beginner'), (2, 'intermediate'), (3, 'advanced')], max_length=255),
        ),
    ]
