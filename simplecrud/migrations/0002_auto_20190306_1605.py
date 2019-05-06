# Generated by Django 2.1.1 on 2019-03-06 16:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('simplecrud', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='location',
            name='total_supply',
            field=models.PositiveIntegerField(default=0, help_text='insert total supply', verbose_name='supplies'),
        ),
        migrations.AlterField(
            model_name='product',
            name='price',
            field=models.PositiveIntegerField(default=0, help_text='insert price', verbose_name='pricee'),
        ),
        migrations.AlterField(
            model_name='product',
            name='quantity',
            field=models.PositiveIntegerField(default=0, help_text='insert quntity', verbose_name='quantityy'),
        ),
    ]
