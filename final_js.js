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
				
	});
}