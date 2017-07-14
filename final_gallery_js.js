function getJSON(url) {
    return fetch(url)
        .then(function (response) {
            return response.json();
        })
        .catch(function (error) {
            console.log(error);
        });
}
		
		ajaxFromLocalJson();
	
	
function ajaxFromLocalJson(){
	getJSON("final_json.json").then(function (data){
		console.log(data);
		var result = data.results;
			
			home_button.addEventListener('click',function(event){
				//event.preventDefault();
			
			document.getElementById("h1_1").style.display = "none";
			document.getElementById("h2_1").style.display = "none";
			
			document.getElementById("p1").innerHTML = data.Home.Announcements;
			document.getElementById("p2").innerHTML = data.Home.About_Us;
			document.getElementById("p3").innerHTML = data.Home.Contact;
			});
	  
	  registration.addEventListener('click',function(event){
		//event.preventDefault();
	  
		document.getElementById("h1_1").style.display = "none";
		document.getElementById("h2_1").style.display = "none";
	  
	  document.getElementById("p1").innerHTML = data.Registration.Instructions;
	  document.getElementById("p2").innerHTML = data.Registration.Registration_form;
	  document.getElementById("p3").innerHTML = "";
	  });
	  
	rules.addEventListener('click',function(event){
		//event.preventDefault();
		
		document.getElementById("h1_1").style.display = "unset";
		
		document.getElementById("h1_1").innerHTML = "Texas Extreme Fishing Rules";
		document.getElementById("p1").innerHTML = data.Rules.Rule;
		document.getElementById("p2").innerHTML = "";
		document.getElementById("p3").innerHTML = "";
 });
  
	
	});
}
