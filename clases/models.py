from django.db import models

class Clases(models.Model):
	nombre = models.CharField(max_length=255)
	descripcion = models.TextField()
	url = models.CharField(max_length=100)
	thumb = models.CharField(max_length=100)

	def __unicode__(self):
		return self.nombre