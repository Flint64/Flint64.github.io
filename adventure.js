var instructions = [
    {
        "id": 1,
        "choices": {
            "first": 2,
            "second": 3
        },
        "choiceText": "choose 1",
        "title": "The Adventure Begins",
        "description": "This is where you setup your initial story",
		"ending": false
    },
    {
        "id": 2,
        "choices": {
            "first": 4,
            "second": 5
        },
        "choiceText": "Go Left",
        "title": "The long hallway",
        "description": "Describe the current setting",
		"ending": false
    },
    {
        "id": 3,
        "choices": {
            "first": 6,
            "second": 7
        },
        "choiceText": "Go Right",
        "title": "The hungry beast",
        "description": "This is probably not going to end well.",
		"ending": true
    }];


//updates the screen to show the current description and choices
//requires the id of the new set of instructions
function nextStep(id) {
    //first we need to get the new item from the list of instructions
    var instruction = getItem(instructions, id);

    
    //then we need to update the screen with the main description
    updateElement('title', instruction.title);
    updateElement('description', instruction.description);
    
    //then get the items for choice1 and 2 from the list
    var choice1 = getItem(instructions, instruction.choices.first);
    var choice2 = getItem(instructions, instruction.choices.second);
	//var ending = getItem(instructions, ending);
    
		if (instruction.ending == true) {
		alert ("Fin")
	}

	
    //check to see if they are endpoints
    
    //if endpoints then end the game

    
    //if not update those sections on the screen with the choiceText
    updateElement('choiceOne', choice1.choiceText);
    updateElement('choiceTwo', choice2.choiceText);
    updateButton('buttonOne', choice1.id);
    updateButton('buttonTwo', choice2.id);
	
	
}

//1. create the getItem, updateElement, and updateButton functions
function getItem(instructions, id){
	for (var i = 0; i < instructions.length; i++){
		if (instructions[i].id == id)
			return instructions[i];
		

	}
	
}

//getItem: gets an item from a list by id
//requires the list and id of the desired element

//updateElement: updates the contents of an element on the screen
function updateElement(ID, contents){
	document.getElementById(ID).innerHTML = contents;
	
}
//requires the id of the div to update, and the new contents.

//updateButton: sets the onclick event for a button with the id of the item it chooses
function updateButton(buttonID, choiceID){
	var button = document.getElementById(buttonID);
	button.setAttribute("onclick", "nextStep(" + choiceID + ")")
}
//2. then create and use a function to initialize the game to step 1

//3. other needed functions
//restart: resets the game back to the beginning.

//happy ending: does whatever we want it to do when they end in a good place    

//sad ending: does whatever we want it to do if they end at a bad place

///I worked with Wen-Yao on this project