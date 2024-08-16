from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import viewsets
from .models import Pattern
from .serializers import PatternSerializer

@api_view(['GET'])
def get_patterns(request):
    data = {"message": "This is a test endpoint"}
    return Response(data)

class PatternViewSet(viewsets.ModelViewSet):
    queryset = Pattern.objects.all()
    serializer_class = PatternSerializer
