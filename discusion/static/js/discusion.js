$(document).on('ready', main_discusiones);

function main_discusiones() {
	$.ajaxSetup({
		beforeSend: function(xhr, settings) {
			if(settings.type == "POST"){
				xhr.setRequestHeader("X-CSRFToken", $('[name="csrfmiddlewaretoken"]').val());
			}
		}
	});

	$('#preguntas button').on('click', enviar_pregunta);

	$('#preguntas').on('click', 'a', cargar_respuestas);
}

function enviar_pregunta() {
	var input = $('#crear-pregunta input:visible');

	if(input.val() != ''){
		$.post('guardar-pregunta/', { pregunta: input.val() }, actualizar_preguntas);
	}
}

function actualizar_preguntas (data) {
	var ul = $('#preguntas ul');

	ul.html('');
	$('#crear-pregunta input:visible').val('');

	$.each(data.preguntas, function(i, elemento){
		$('<li><a data-id="' + elemento.id + '">' + elemento.titulo + '</a></li>').appendTo(ul);
	});
}

function cargar_respuestas(data) {
	var id = $(data.currentTarget).data('id');

	$.get('cargar-respuestas/' + id, mostrar_respuestas);
}

function mostrar_respuestas (data) {
	var respuestas = $('#respuestas');

	respuestas.html('');


	var pregunta = $('#preguntas a[data-id="' + data.pregunta + '"]').html();

	var div = $('<div>');

	$('<a class="regresar">').html('Regresar').appendTo(div);

	div.append('<p data-id="' + data.pregunta + '">' + pregunta + '</p>');

	$('<a class="responder">').html('Responder').appendTo(div).on('click', responder);

	div.appendTo(respuestas);

	
	var ul = $('<ul>')

	$.each(data.respuestas, function(i, elemento){
		$('<li>').html(elemento).appendTo(ul);
	});

	ul.appendTo(respuestas);

	$('#preguntas').css('right', '-110%');
	respuestas.css('right', '0');

	respuestas.on('click', '.regresar', function(){
		respuestas.css('right', '-110%');
		$('#preguntas').css('right', '0');
	});

}

function responder(data) {
	var div = $('<div id="responder">');

	$('<textarea placeholder="Escribe tu respuesta">').appendTo(div);
	$('<button>').html('Enviar Respuesta').appendTo(div).on('click', enviar_respuesta);

	$('#respuestas div:first').after(div);
}

function enviar_respuesta() {
	var respuesta = $('#responder textarea');

	if(respuesta.val() != ''){
		$.post(
			'guardar-respuesta/', 
			{ respuesta: respuesta.val(), pregunta: $('#respuestas p').data('id') }, 
			actualizar_respuestas
		);
	}
}

function actualizar_respuestas(data) {
	var ul = $('#respuestas ul');

	ul.html('');

	$.each(data.respuestas, function(i, elemento){
		$('<li>').html(elemento).appendTo(ul);
	});

	$('#responder').remove();
}