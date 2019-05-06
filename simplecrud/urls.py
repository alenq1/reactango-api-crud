from django.contrib.auth import views 
from django.urls import path, reverse_lazy
from simplecrud import views as vi

urlpatterns = [
    #crudviews
    path('', vi.ProductList.as_view(), name='index'),
    path('detail/<int:pk>', vi.ProductDetail.as_view(), name='prod_detail'),
    path('create', vi.ProductCreate.as_view(), name='prod_create'),
    path('update/<int:pk>', vi.ProductUpdate.as_view(), name='prod_update'),
    path('delete/<int:pk>', vi.ProductDelete.as_view(), name='prod_delete'),
    ## auth views
    path('login/', views.LoginView.as_view(), name='login'),
    path('logout/', views.LogoutView.as_view(), name='logout'),
    path('password-change/', views.PasswordChangeView.as_view(), name='password_change'),
    path('password-change/done/', views.PasswordChangeDoneView.as_view(), name='password_change_done'),
    ##Change to redirect in reset done with reverse_lazy
    path('password-reset/', views.PasswordResetView.as_view(success_url=reverse_lazy('app:password_reset_done')), name='password_reset'),
    path('password-reset/done/', views.PasswordResetDoneView.as_view(), name='password_reset_done'),
    path('reset/<uidb64>/<token>/', views.PasswordResetConfirmView.as_view(), name='password_reset_confirm'),
    path('reset/done/', views.PasswordResetCompleteView.as_view(), name='password_reset_complete'),
]
