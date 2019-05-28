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
    #authentication_classes = ( AllowAny,)
    #permission_classes = (AllowAny,)

#    def create(self, request): # Here is the new update comes <<<<
#        post_data = request.data
#        print(request.data, "ESTA es la data enviada")
        # do something with post data
#        return HttpResponse(post_data, "return data")

class LocationViewset(ModelViewSet):
    
    queryset = Location.objects.all()
    serializer_class = LocationSerializer
    authentication_classes = (jwtauth.JWTAuthentication, SessionAuthentication)
    permission_classes = (IsAuthenticated,)


class ClientViewset(ModelViewSet):
    
    queryset = Client.objects.all()
    serializer_class = ClientSerializer
    authentication_classes = (jwtauth.JWTAuthentication, SessionAuthentication)
    permission_classes = (IsAuthenticated,)


