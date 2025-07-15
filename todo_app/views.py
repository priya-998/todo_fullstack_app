from rest_framework import generics, viewsets
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Task
from .serializers import TaskSerializer, RegisterSerializer
from django.contrib.auth.models import User

# User Registration View
class CreateUserViews(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]

# Task ViewSet
class TaskViewSet(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Task.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)