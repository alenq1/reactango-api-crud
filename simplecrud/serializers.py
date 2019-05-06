from rest_framework import serializers
from . import models



class LocationSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = models.Location
        fields = ('id', 'name')



class ProductSerializer(serializers.ModelSerializer):

    ## For create with foreignkey fields

    location = serializers.SlugRelatedField(queryset=models.Location.objects.all(), slug_field='name')
    #location = serializers.SerializerMethodField()
    #location = LocationSerializer()
    #location = serializers.RelatedField(queryset=models.Location.objects.all(), related_field='name')

    class Meta:
        model = models.Product
        fields = ('id', 'uuid', 'name', 'location', 'price', 'quantity', 'description')


class ClientSerializer(serializers.ModelSerializer):

#########################REVISARR
#class ClientSerializer(serializers.HyperlinkedModelSerializer):
    
    class Meta:
        model = models.Client
        fields = ('id', 'name', 'email')