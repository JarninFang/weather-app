
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
			console.log("success");
			var parsedXML = $.parseXML(xml);
			console.log($(parsedXML).find("name"));
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
	$('#location-text').text();
}

function fail(err) {
	console.warn(err.message);
}