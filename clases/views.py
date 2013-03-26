import json

from clases.models import Clases
from django.http import HttpResponse, Http404
from django.shortcuts import render_to_response
from django.template import RequestContext

def home(request):
	clases = Clases.objects.all()
	return render_to_response('clases.html', {'clases': clases}, context_instance=RequestContext(request))

def cargar_clase(request, id):
	if request.is_ajax():
		clase = Clases.objects.get(pk=id)
		return HttpResponse(
			json.dumps({'nombre': clase.nombre, 'descripcion': clase.descripcion, 'url': clase.url }),
			content_type="application/json; charset=uft8"
			)
	else:
		raise Http404

