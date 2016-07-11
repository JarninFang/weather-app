//0 for fahrenheit, 1 for celsius
var tempState = 0;
var temperature;
var description;

$(document).ready(function() {
	if(navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(showPosition, fail);
	}
	
	$("#temp-button").click(function() {
		if(tempState == 0) {
			temperature = FtoC(temperature);
			tempState = 1;
			$("#temp-button").text("Fahrenheit");
		} else {
			temperature = CtoF(temperature);
			tempState = 0;
			$("#temp-button").text("Celsius");
		}
		$("#temperature").text(temperature);
	});
});

function showPosition(position) {
	var getUrl = "https://api.geonames.org/findNearbyPlaceName?";
	//Convert latitude and longitude into URL params
	var coordParams = {
		lat: position.coords.latitude,
		lng: position.coords.longitude,
		username: "jarninfang"
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
	getUrl = "https://api.openweathermap.org/data/2.5/weather?"
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
			temperature = KtoF(Number(json.main.temp));
			description = json.weather[0].main;
			$('#temperature').text(temperature);
			$('#description').text(description);
			updateBackground(description);
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
	return Math.round(kelvin * (9/5) - 459.67);
}

function FtoC(fahrenheit) {
	return Math.round((fahrenheit - 32) / 1.8);
}

function CtoF(celsius) {
	return Math.round((celsius * 1.8) + 32);
}

function updateBackground(description) {
	if(description == "Clear") {
		document.body.style.backgroundImage = "url('https://images.unsplash.com/photo-1428535172630-fb1c050ac3e0?crop=entropy&dpr=1.5&fit=crop&fm=jpg&h=600&ixjsv=2.1.0&ixlib=rb-0.3.5&q=66&w=1300')";
	} else if(description == "Snow") {
		document.body.status.backgroundImage = "url('https://images.unsplash.com/photo-1447877015176-3099cb49cd6a?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&w=1080&fit=max&s=1f5b6605ce035d751113e7c92cfd2116')";
	} else if(description == "Rain") {
		document.body.style.backgroundImage = "url('https://images.unsplash.com/photo-1428592953211-077101b2021b?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&w=1080&fit=max&s=9dee70ba78c49619bc7f5c8a91778f2b')";
	} else if(description == "Clouds") {
		document.body.style.backgroundImage = "url('https://images.unsplash.com/photo-1446367819189-c48fb912db4d?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&w=1080&fit=max&s=355e23d399f55c5f46a8ed5e3f3d35ee')";
	}
}
