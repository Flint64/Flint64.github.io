function getJSON(url) {
    return fetch(url)
        .then(function (response) {
            return response.json();
        })
        .catch(function (error) {
            console.log(error);
        });
}

(function init() {
            var franklin = document.getElementById('franklinLink');
            var greenville = document.getElementById('greenvilleLink');
            var springfield = document.getElementById('springfieldLink');
        franklin.addEventListener('click', function(event) { 
            event.preventDefault();
            ajaxFromLocalJson('Franklin');
        });
        
        greenville.addEventListener('click', function(event) { 
            event.preventDefault();
            ajaxFromLocalJson('Greenville');
        });
        
        springfield.addEventListener('click', function(event) { 
            event.preventDefault();
            ajaxFromLocalJson('Springfield');
        });
    }) ();

function ajaxFromLocalJson(locationToGrab){
	getJSON("/weather.json").then(function (data){
		console.log(data);
		var location = data["locationToGrab"]['City'];
		var state = data["locationToGrab"]['State'];
		var temp_f = data["locationToGrab"]['High'];
		
		console.log("Current temperature in " + location + " is: " + temp_f);
		
		var cur_location = document.getElementById("location");
		var temp = document.getElementById("temp");
		var message = document.getElementById("message");
		
	});
}