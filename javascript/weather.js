
$(document).ready(function() {
	if(navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(showPosition, fail);
	}
});

function showPosition(position) {
	console.log("Success");
}
function fail(err) {
	console.warn(err.message);
}