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
            var home = document.getElementById('home_button');
            var registration = document.getElementById('registration');
            var gallery = document.getElementById('gallery');
			var schedule = document.getElementById('schedule');
			var results = document.getElementById('results');
			var rules = document.getElementById('rules');
        home.addEventListener('click', function(event) { 
            event.preventDefault();
            ajaxFromLocalJson('Home');
        });
        
        registration.addEventListener('click', function(event) { 
            event.preventDefault();
            ajaxFromLocalJson('Registration');
        });
        
        gallery.addEventListener('click', function(event) { 
            event.preventDefault();
            ajaxFromLocalJson('Gallery');
        });
    }) ();
	
function ajaxFromLocalJson(locationToGrab){
	getJSON("/final_js.js").then(function (data){
		console.log(data);
		var announcements = data["locationToGrab"]['Announcements'];
		
	});
}