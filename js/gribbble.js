(function(){
	var app = angular.module('gribbble', ['ngSanitize']);
	app.controller('ShotsController', ['$http', function($http){
		var shots = this;
		$http.jsonp('http://api.dribbble.com/shots/popular/?callback=JSON_CALLBACK').success(function(data){
			shots.list = data.shots;
			shot_description = data.shots.description;
		});
	}]);
	app.controller('ShotController', ['$http', function($http){
		var shot = this;
		var html_desc = '';
		$http.jsonp('http://api.dribbble.com/shots/'+getParameterByName('id')+'?callback=JSON_CALLBACK').success(function(data){
			shot.info = data;
		});
	}]);
	function getParameterByName(name) {
	    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
	    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
	        results = regex.exec(location.search);
	    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
	}
	$(document).ready(function() {
		$('.interna main').animate({opacity:1}, 1200);
	});
})();