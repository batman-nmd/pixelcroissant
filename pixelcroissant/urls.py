from django.contrib import admin
from django.urls import path, include
from patterns import views as pattern_views
from patterns.views import RegisterView, LoginView, VerifyEmail, PasswordResetRequestView, PasswordResetConfirmView
from django.shortcuts import redirect

def redirect_to_login(request):
    return redirect('/api/login/')

urlpatterns = [
    path('', redirect_to_login, name='home'),  
    path('admin/', admin.site.urls),
    path('api/register/', RegisterView.as_view(), name='register'),
    path('api/login/', LoginView.as_view(), name='login'),
    path('api/email-verify/<uidb64>/<token>/', VerifyEmail.as_view(), name='email-verify'),
    path('api/password-reset-request/', PasswordResetRequestView.as_view(), name='password-reset-request'),
    path('api/password-reset-confirm/<uidb64>/<token>/', PasswordResetConfirmView.as_view(), name='password-reset-confirm'),

]
