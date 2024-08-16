from django.shortcuts import render
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PatternViewSet

router = DefaultRouter()
router.register(r'patterns', PatternViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
]


# Create your views here.
