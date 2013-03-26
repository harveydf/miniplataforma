import json

from django.http import HttpResponse, Http404
from discusion.models import Preguntas

def guardar_pregunta(request):
	if request.is_ajax():

		if request.POST['pregunta']:
			pregunta = Preguntas(titulo=request.POST['pregunta'])
			# pregunta.save()

		preguntas = Preguntas.objects.all()

		data = list()
		for pregunta in preguntas:
			data.append({ 'id': pregunta.pk, 'titulo': pregunta.titulo })

		return HttpResponse(
			json.dumps({ 'preguntas': data }),
			content_type="application/json; charset=uft8"
			)
	else:
		raise Http404
