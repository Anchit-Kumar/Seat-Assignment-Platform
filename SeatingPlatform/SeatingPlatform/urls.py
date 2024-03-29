"""
URL configuration for SeatingPlatform project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from core.views import front, employee, employee_detail, seating_chart_state, indexed_seating, update_employee_schedule

urlpatterns = [
    path("admin/", admin.site.urls),
    path("", front, name="front"),
    path("employees/", employee, name="employee"),
    path("employees/<int:pk>/", employee_detail, name="detail"),
    path('seating-chart-state/', seating_chart_state, name='seating-chart-state'),
    path('indexed-seating/', indexed_seating, name='indexed-seating'),
    path('update_employee_schedule/', update_employee_schedule, name='update_employee_schedule'),
]
