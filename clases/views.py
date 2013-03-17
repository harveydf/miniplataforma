import json

from clases.models import Clases
from django.http import HttpResponse
from django.shortcuts import render_to_response

def home(request):
	clases = Clases.objects.all()
	return render_to_response('clases.html', {'clases': clases})

def cargar_clase(request, id):
	clase = Clases.objects.get(pk=id)
	return HttpResponse(
		json.dumps({'nombre': clase.nombre, 'descripcion': clase.descripcion, 'url': clase.url }),
		content_type="application/json; charset=uft8"
		)
