from django.db import models
from uuid import uuid4
from django.urls import reverse


def generateUUID():
    return str(uuid4())


# Create your models here.
class ProductManager(models.Manager):

    def news(self):
        return super().get_queryset().order_by('date_activity')
            

class Common(models.Model):
    name = models.CharField(max_length=35, blank=False, 
                            help_text="Enter name", 
                            verbose_name="Name")
    date_actvity = models.DateTimeField(auto_now=True, verbose_name="Activity")

    class Meta:
        abstract = True


class Product(Common):
    uuid = models.UUIDField(unique=True, editable=False, default=generateUUID)
    location = models.ForeignKey('Location', on_delete=models.CASCADE, verbose_name='localization', related_name='LOCASION')
    quantity = models.PositiveIntegerField(
                                    verbose_name='quantityy', help_text="insert quntity",
                                    default=0)
    price = models.PositiveIntegerField( 
                                    verbose_name='pricee', help_text="insert price",
                                    default=0)
    
    description = models.TextField(max_length=400, help_text="Description of product", 
                                verbose_name="descriptionn")
    date_registres = models.DateTimeField(auto_now_add=True, verbose_name="date of registry")

    
    #Managers
    
    objects = models.Manager()
    fechaproc = ProductManager()
    

    def __str__(self):
        return f" Name:  {self.name} Location : {self.location} Qunatity: {self.quantity}"
    
    ## For update.view redirect
    def get_absolute_url(self):
        return reverse('app:prod_detail', kwargs={'pk': self.pk})

    class Meta:
        ordering = ['name']

    
class Location(Common):
    manager = models.TextField(max_length=35, help_text="Description of manager", 
                                verbose_name="manager name")
    
    total_supply = models.PositiveIntegerField( 
                                    verbose_name='supplies', help_text="insert total supply",
                                    default=0)

    def __str__(self):
        return f" Name:  {self.name} Manager : {self.manager} Supply: {self.total_supply}"

    
class Client(Common):


    prod_own = models.ForeignKey('Product', to_field="uuid", db_column="uuid", verbose_name="Producto Adquirido", on_delete=models.CASCADE)
    email = models.EmailField(max_length=255, null=True, default=None)

    def __str__(self):
        return f" Name:  {self.name} Producto : {self.prod_own} Mail: {self.email}"
