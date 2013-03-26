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
}

function enviar_pregunta() {
	var input = $('#crear-pregunta input:visible');

	if(input.val() != ''){
		$.post('guardar-pregunta/', { pregunta: input.val() }, actualizar_preguntas);
	}
}

function actualizar_preguntas (data) {
	console.log(data.preguntas);
}