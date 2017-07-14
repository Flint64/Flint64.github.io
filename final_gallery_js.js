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
		ajaxFromLocalJson();
	
	
function ajaxFromLocalJson(){
	getJSON("final_json.json").then(function (data){
		var page = getURLParameter("page");
		console.log(page);
		getPage(page);
		var result = data.results;
		
	
});

}


