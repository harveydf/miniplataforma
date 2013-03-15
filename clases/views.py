from clases.models import Clases
from django.shortcuts import render_to_response

def home(request):
	clases = Clases.objects.all()
	return render_to_response('clases.html', {'clases': clases})
