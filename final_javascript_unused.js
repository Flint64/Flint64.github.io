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
			document.getElementById('home_button').onclick = updatePage();
        
        registration.addEventListener('click', function(event) { 
            event.preventDefault();
            ajaxFromLocalJson('Registration');
        });
        
        gallery.addEventListener('click', function(event) { 
            event.preventDefault();
            ajaxFromLocalJson('Gallery');
        });
		ajaxFromLocalJson('Home');
		
    }) ();
	
	function updatePage {
        document.getElementById("text").onclick = function() { 
            alert('hello'); 
        };
    }();
}
	
function ajaxFromLocalJson(locationToGrab){
	getJSON("final_json.json").then(function (data){
		console.log(data);
		var announcements = data["locationToGrab"]['Announcements'];
		
	});
}