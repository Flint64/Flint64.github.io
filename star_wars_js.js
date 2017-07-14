//helper function to fetch the data from an external source
function getJSON(url) {
    return fetch(url)
        .then(function (response) {
            return response.json();
        })
        .catch(function (error) {
            console.log(error);
        });
}
     
 //lets get some ships
function fetchShips() {
    var url = "//swapi.co/api/starships/";     					
    getJSON(url).then(function (data) {      						
       // console.log(data);
		var results = data.results;
		var shipListElement = document.getElementById('shiplist');		
		shipListElement.innerHTML = ""; 								
			results.forEach(function(ship){ 							
			var listItem = document.createElement('li');				
			var link = document.createElement('a');						
			link.setAttribute('href', ship.url)							
			link.innerHTML = ship.name;         

			
			link.addEventListener('click',function(event){
				event.preventDefault();
				getShipDetails(ship.url);
				
				
				document.getElementById('name').innerHTML = ship.name;
				document.getElementById('model').innerHTML = ship.model;
				document.getElementById('class').innerHTML = ship.starship_class;
				document.getElementById('manufacturer').innerHTML = ship.manufacturer;
			});                                              
			listItem.appendChild(link);									
			shipListElement.appendChild(listItem);
		});
		
    });
}
	
	//PART 2
	//get all of our new list items. hint: querySelectorAll
//	function getItems(){
	//	querySelectorAll("#shipList > li > a")
	
	//loop through each of them
	
	//attatch a click event listener
	
	//when clicked the default link behavior should be stopped and 
	
	//the ship details function should be called, passing the value of the href attribute in
	
//	}
	
	//PART 3
	//set previous and next links
	
	function getShipDetails(url){
			//call getJSON functions for the provided url
			getJSON(url).then(function (data){
				console.log(data);
				//with the results populate the elements in the #detailsbox
				
			});
	}

fetchShips();

///I worked with Wayne on this project.














