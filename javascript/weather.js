$(document).ready(function() {
	if(navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(showPosition, fail);
	}
});

function showPosition(position) {
	var getUrl = "http://api.geonames.org/findNearbyPlaceName?";
	//Convert latitude and longitude into URL params
	var coordParams = {
		lat: position.coords.latitude,
		lng: position.coords.longitude,
		username: "demo"
	};

	var str = jQuery.param(coordParams);

	getUrl = getUrl + str;
	console.log("The url is: " + getUrl);

	//Make ajax call to API to get city name
	$.ajax({
		url: getUrl,
		type: "GET",
		success: function(xml) {
			//traverses through xml and gets city name
			var test = $(xml).find('geonames > geoname > name').text();
			$('#location-text').text(test);
		},
		error: function( xhr, status, errorThrown ) {
			alert( "Sorry, there was a problem!" );
			console.log( "Error: " + errorThrown );
			console.log( "Status: " + status );
			console.dir( xhr );
		},
		complete: function( xhr, status ) {
			console.log( "The request is complete!" );
		}	
	});

	//Make ajax call to API to get weather
	getUrl = "http://api.openweathermap.org/data/2.5/weather?"
	coordParams = {
		lat: position.coords.latitude,
		lon: position.coords.longitude,
		appid: "70da69383c51677ea8c5b9e75ffa0dd2"
	};
	str = jQuery.param(coordParams);
	getUrl = getUrl + str;
	console.log(getUrl);
	$.ajax({
		url: getUrl,
		type:"GET",
		success: function(json) {
			console.log(json);
			$('#temperature').text(json.main.temp);
		},
		error: function( xhr, status, errorThrown ) {
			alert( "Sorry, there was a problem!" );
			console.log( "Error: " + errorThrown );
			console.log( "Status: " + status );
			console.dir( xhr );
		},
		complete: function( xhr, status ) {
			console.log( "The request is complete!" );
		}	
	});
}

function fail(err) {
	console.warn(err.message);
}

function KtoF(kelvin) {
	return (kelvin x (9/5) - 459.67);
}