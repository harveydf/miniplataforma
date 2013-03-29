from django import template

from discusion.models import Preguntas

register = template.Library()

@register.inclusion_tag('discusiones.html', takes_context=True)
def show_discusiones(context):
	preguntas = Preguntas.objects.all().order_by('-id')

	return {'preguntas': preguntas}

