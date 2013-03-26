$(document).on('ready', main);

function main () {
	$('#clases').on('click', 'a', cargar_contenido_clase);
}

function cargar_contenido_clase (data) {
	var id = $(data.currentTarget).data('id');

	$.get('cargar-contenido-clase/' + id, cargar_clase)
}

function cargar_clase(data){
	var contenido = $('#contenido-clase');
	
	contenido.html('');

	$('<a class="regresar">').html('Regresar').appendTo(contenido);

	$('<h2>').html(data.nombre).appendTo(contenido);

	$('<iframe src="http://www.youtube.com/embed/' + data.url + '" allowfullscreen>').appendTo(contenido);

	$('<p>').html(data.descripcion).appendTo(contenido);

	$('#clases').css('left', '-110%');
	contenido.css('left', '0');

	contenido.on('click', 'a', function(){
		contenido.css('left', '-110%');
		$('#clases').css('left', '0');
	});
}