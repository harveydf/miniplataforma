from django import template

register = template.Library()

@register.inclusion_tag('discusiones.html')
def show_discusiones():
	return

