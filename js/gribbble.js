var page = 1;
var per_page = 18;
var shots_array = [];

// lista os shots na página inicial
function getShots(per_page, page) {
	$.ajax({
		url: "http://api.dribbble.com/shots/popular/?page="+page+"&per_page="+per_page,
		dataType: 'jsonp',
	})
	.done(function(results) {
		$.each(results.shots, function(i, shots) {
			$('.shots').append('<li class="shot" id="'+ shots.id +'"><a href="shot.html?id='+shots.id+'"><img src="'+ shots.image_url + '" alt="" /><h3>'+shots.title +'</h3></a></li>');
		});
	})
	.fail(function() {
		$('.shots').append('<li>Lamentamos, mas não pudemos conectar aos servidores do Dribbble. Tente novamente daqui a pouco!</li>')
	})
}
// lista detalhes do shot
function getShot(id) {
	$.ajax({
		url: 'http://api.dribbble.com/shots/' + id,
		type: 'GET',
		dataType: 'jsonp',
	})
	.done(function(result) {
		$('.detalhe').fadeIn();
		$('.detalhe').append('<h2>'+ result.title + '</h2>')
		$('.detalhe').append('<figure><img src="'+ result.player.avatar_url + '" title="'+ result.player.name +'"></h2>')
		$('.detalhe').append('<span class="author">por <a href="'+ result.player.url +'" target="_blank">'+ result.player.name + '</a></span>')
		$('.detalhe').append(result.description)
		$('.detalhe').append('<img class="feat" src="'+ result.image_url +'">')
	})
	.fail(function() {
		$('.detalhe').append('<p>Lamentamos, mas não pudemos conectar aos servidores do Dribbble. Tente novamente daqui a pouco!</p>')
	})
}
// checa a largura do device para definir quantidade de shots na tela.
function howManyShots() {
	var winWidth = $(window).width();
	var shotWidth = 310;
	for (i = 8; i > 0; i--) {
		if (shotWidth * i > winWidth) {
			continue;
		} else {
			per_page = i * 3;
			break;
		}
	}
}
// recupera parâmetros das query strings
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

$(document).ready(function(){
	howManyShots();
	if ($('html').hasClass('home')) {
		getShots(per_page, page);
	} else {
		var	shotID = getParameterByName('id');
		getShot(shotID);
	}
});

$(document).on('click', '.shot', function(event) {
	getShot($(this).attr('id'));
});

$(document).on('click', '.show_more', function(event) {
	$('.shots li').remove();
	page++;
	getShots(per_page, page);
});