from django.db import models

class Preguntas(models.Model):
	titulo = models.CharField(max_length=255)

	def __unicode__(self):
		return self.titulo

class Respuestas(models.Model):
	titulo = models.CharField(max_length=255)
	pregunta = models.ForeignKey(Preguntas)

	def __unicode__(self):
		return self.titulo
