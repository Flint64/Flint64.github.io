function getJSON(url) {
    return fetch(url)
        .then(function (response) {
            return response.json();
        })
        .catch(function (error) {
            console.log(error);
        });
}
function getURLParameter(name) {
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
}

function buildHome(info) {
	document.getElementById("h1_1").style.display = "none";
	document.getElementById("h2_1").style.display = "none";
	
	document.getElementById("p1").innerHTML = info.Announcements;
	document.getElementById("p2").innerHTML = info.About_Us;
	document.getElementById("p3").innerHTML = info.Contact;
}

function buildRegistration(info) {
	document.getElementById("h1_1").style.display = "none";
	document.getElementById("h2_1").style.display = "none";
	  
	document.getElementById("p1").innerHTML = info.Instructions;
	document.getElementById("p2").innerHTML = info.Registration_form;
	document.getElementById("p3").innerHTML = "";
}

function buildRules(info){
	document.getElementById("h1_1").style.display = "unset";
		
		document.getElementById("h1_1").innerHTML = "Texas Extreme Fishing Rules";
		document.getElementById("p1").innerHTML = info.Rule;
		document.getElementById("p2").innerHTML = "";
		document.getElementById("p3").innerHTML = "";
}
		ajaxFromLocalJson();
		
				
/* function getPage(page){
	if (page == "registration"){
		buildRegistration(data.Registration);
	} 
	else if (page == "rules"){
		buildRules(data.Rules);
	}
} */
	
	
function ajaxFromLocalJson(){
	getJSON("final_json.json").then(function (data){
		var page = getURLParameter("page");
		console.log(page);
		//getPage(page);
		var result = data.results;
		buildHome(data.Home);

			
			home_button.addEventListener('click',function(event){
				event.preventDefault();
				buildHome(data.Home);
			
			});
	  
			registration.addEventListener('click',function(event){
				event.preventDefault();
				buildRegistration(data.Registration);
	  
	  });
	  
			rules.addEventListener('click',function(event){
				event.preventDefault();
				buildRules(data.Rules);
	  
	  });
	
});

}

