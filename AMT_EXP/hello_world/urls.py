from django.conf.urls import url
from . import views

urlpatterns = [
	url(r'^$', views.just_aline, name='just_aline'),
]
