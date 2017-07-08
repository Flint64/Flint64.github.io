// Current Location Scripts
(function () {

    var status = document.getElementById('status');

    (function getGeoLocation() {
        status.innerHTML = 'Getting Location...';
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                var lat = position.coords.latitude;
                var long = position.coords.longitude;

                // Call the getData function, send the lat and long
                getData(lat, long);

            });
        } else {
            status.text("Your browser doesn't support Geolocation or it is not enabled!");
        }

    }());

    function getJSON(url) {
        return fetch(url)
            .then(function (response) {
                return response.json();
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    // Get the data from the wunderground API
    function getData(lat, long) {
        var url = "http://api.wunderground.com/api/0b4866398b835839/geolookup/conditions/q/"; //change this to the correct URL for wunderground
		url = url + lat + "," + long + ".json";
	//	window.alert(url);
        getJSON(url).then(function (data) {
            console.log(data);
			var place = data.location;
			var cur_con = data.current_observation;
            //add the code necessary here to update the page with all of the correct data points.
			document.getElementById('cityDisplay').innerHTML = place.city + "," + " " + place.state;
			document.getElementById('currentTemp').innerHTML = cur_con.temp_f;
			document.getElementById('add1').innerHTML = "Wind:" + " " + cur_con.wind_mph + "mph";
			document.getElementById('add2').innerHTML = cur_con.icon;
			document.getElementById('add3').innerHTML = cur_con.observation_time;
            //this line will cause the Loading message to fade away.
            document.getElementById("cover").classList.add('fadeout');

        });


    }

    // A function for changing a string to TitleCase
    function toTitleCase(str) {
        return str.replace(/\w+/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    }
}());
