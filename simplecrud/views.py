from django.shortcuts import render, HttpResponse
from django.views.generic import ListView, DetailView 
from django.views.generic.edit import CreateView, UpdateView, DeleteView
from .models import Product, Client, Location
from .serializers import ProductSerializer, LocationSerializer, ClientSerializer, CreateUserSerializer, UserSerializer
from django.contrib.auth.mixins import LoginRequiredMixin, PermissionRequiredMixin
from django.urls import reverse_lazy
from rest_framework.generics import GenericAPIView
from rest_framework.viewsets import ModelViewSet
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.authentication import SessionAuthentication 
from rest_framework_simplejwt import authentication as jwtauth
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly, AllowAny
from rest_framework.response import Response
from rest_framework import status

# Create your views here.

class ProductList(LoginRequiredMixin, ListView):
    model = Product
    paginate_by = 10

class ProductDetail(LoginRequiredMixin, DetailView):
    model = Product

class ProductCreate(LoginRequiredMixin, CreateView):
    login_url = 'login/'
    model = Product
    fields = [
        'name',
        'location',
        'quantity',
        'price',
        'description'
        ]
    success_url = reverse_lazy('app:index')

class ProductUpdate(LoginRequiredMixin, UpdateView):
    model = Product
    fields = [
        'name',
        'location',
        'quantity',
        'price',
        'description'
        ]
    

class ProductDelete(LoginRequiredMixin, DeleteView):
    model = Product
    success_url = reverse_lazy('app:index')



## API VIEWS


class RegistrationAPI(GenericAPIView):
    serializer_class = CreateUserSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data
        })





class ProductViewset(ModelViewSet):
    parser_classes = (MultiPartParser, FormParser)

    
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    #authentication_classes = (jwtauth.JWTAuthentication, SessionAuthentication)
    #permission_classes = (IsAuthenticated,)


    def create(self, request): # Here is the new update comes <<<<
        post_data = request.data
        #print(request.data, "ESTA es la data enviada")
        # do something with post data
        #return HttpResponse(post_data, "return data")

        product_serializer = ProductSerializer(data=request.data)
        if product_serializer.is_valid():
            product_serializer.save()
            return Response(product_serializer.data, status=status.HTTP_201_CREATED)
        else:
        #    print('error', product_serializer.errors)
            return Response(product_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, *args, **kwargs):
        
        #partial = True
        instance = self.get_object()

        #print(request.data, "ESTA es la data enviada para MODIFFFF")
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        
        
        self.perform_update(serializer)
        return Response(serializer.data)


class LocationViewset(ModelViewSet):
    
    queryset = Location.objects.all()
    serializer_class = LocationSerializer
    #authentication_classes = (jwtauth.JWTAuthentication, SessionAuthentication)
    #permission_classes = (IsAuthenticated,)


class ClientViewset(ModelViewSet):
    
    queryset = Client.objects.all()
    serializer_class = ClientSerializer
    authentication_classes = (jwtauth.JWTAuthentication, SessionAuthentication)
    permission_classes = (IsAuthenticated,)


