let menuButton = document.getElementById("menuButton");
let userArea = document.getElementById("userArea");
let statusBar = document.getElementById("statusBar");
let storyArea = document.getElementById("storyArea");
let choiceButtons = document.getElementById("choiceButtons");
let menu = document.getElementById("menu");
let settingsButton = document.getElementById("settings");
let inventoryButton = document.getElementById("inventory");
let choices = document.getElementById("menuChoices");
let infoBars = document.getElementById("infoBars");
let closeMenu = document.getElementById("closeMenu");
let testDiv = document.getElementById("testDiv");
let extraStuff = document.getElementById("extraStuff");
let choiceLeft = document.getElementById("choiceLeft");
let choiceRight = document.getElementById("choiceRight");

  /*
*   When opening the menu, change the menu button text to close,
*   slide the bar up and when closing, slide it back down and
*   if the choices are gone, put them back.
  */
menu.addEventListener("touchend", e => {

  if (choiceButtons.style.opacity == 1){
    menu.innerHTML = "Close";
    statusBar.style.height = "10.7em";
    choiceButtons.style.opacity = 0;
  } 
  else if (choiceButtons.style.opacity == 0){
    menu.style.marginTop = "0";
    menu.innerHTML = "Menu";
    statusBar.style.height = "6em";
    choiceButtons.style.opacity = 1;
  }
});

closeMenu.addEventListener("touchend", e => {
  if (menuChoices.style.display == "none"){ //if not visible
      menuChoices.style.display = "block" //make visible
      menu.style.display = "initial";
      menu.style.marginTop = "0";
      menu.innerHTML = "Menu";
      statusBar.style.height = "6em";
      choiceButtons.style.opacity = 1;
      closeMenu.style.display = "none";
      extraStuff.style.display = "none";
      }
});

  /*
*   Handle opening the app settings menu
  */

settingsButton.addEventListener("touchend", e => {
  statusBar.style.height = "90%";
  menuChoices.style.display = "none";
  menu.style.display = "none";
  closeMenu.style.display = "block";
  extraStuff.style.display = "block";
});

  /*
*   Handle opening the inventory screen
  */
 inventoryButton.addEventListener("touchend", e => {
  statusBar.style.height = "90%";
  menuChoices.style.display = "none";
  menu.style.display = "none";
  closeMenu.style.display = "block";
  extraStuff.style.display = "block";
});


  /*
*   Pressing save
  */

  /*
*   Pressing load
  */


  var requestURL = 'http://127.0.0.1:5500/story.json';
  var storyRequest = new XMLHttpRequest();
  storyRequest.open('GET', requestURL);
  storyRequest.responseType = 'json';
  storyRequest.send();

  var requestURL2 = 'http://127.0.0.1:5500/combat.json';
  var combatRequest = new XMLHttpRequest();
  combatRequest.open('GET', requestURL2);
  combatRequest.responseType = 'json';
  combatRequest.send();

  /*
*   Creates the story variable to hold the JSON object,
*   then loops through the first instance of the object
*   and grabs the text and creates a <p> for each one and
*   puts the text into the page then puts the <p> into the page
  */

//story[storyContinue] is just the first array.
  /*
*   Maybe pass in a number corresponding to the right array # of the json story
*   and then increase that number at the end when you hit continue then re-call
*   the function with the increased number to pull up the next story section.
*   Not really sure what to do yet for the different choices though.
  */

  let storyContinue = 0;

 function start(storyContinue) {

  for (k in story[storyContinue].text) {

    var p = document.createElement("p");
    var content = document.createTextNode(story[storyContinue].text[k]);
    p.appendChild(content);
    storyArea.appendChild(p);
    }

    if (story[storyContinue].continue == true){
      var button = document.createElement("Button");
      var text = document.createTextNode("Continue");
      button.appendChild(text);
      choiceLeft.appendChild(button);

      button.addEventListener("touchend", e => {
       
        //Remove the story from storyArea
        if (storyArea.hasChildNodes()){
          storyArea.innerHTML = "";
          choiceLeft.innerHTML = "";
          choiceRight.innerHTML = "";
        }

        //increase story counter. Might need to 
        //add more modifiers to be more specific for other choices

       storyContinue++;
       start(storyContinue);        

      });
          //Figure out how to handle the different choices.          

    } else if (story[storyContinue].continue == false){
      let choiceNum = story[storyContinue].choice.length;
        switch (choiceNum){
          case 4: {
            for (var i = 0; i < choiceNum; i++){
              var button = document.createElement("button");
            var text = document.createTextNode(story[storyContinue].choice[i]);
            button.appendChild(text);
              if (i < 2){
                choiceLeft.appendChild(button);
              } else {
                choiceRight.appendChild(button);
              }
            }
            
          } break;

          case 3: {

            for (var i = 0; i < choiceNum; i++){
              var button = document.createElement("button");
              var text = document.createTextNode(story[storyContinue].choice[i]);
              button.appendChild(text);
              if (i < 2){
                choiceLeft.appendChild(button);
              } else {
                choiceRight.appendChild(button);
              }
            }

          } break;

          case 2: {
            for (var i = 0; i < choiceNum; i++){
              var button = document.createElement("button");
              button.setAttribute("id", story[storyContinue].choice[i].id);
              var text = document.createTextNode(story[storyContinue].choice[i].Title);             
              button.appendChild(text);
              button.addEventListener("touchend", e => { doSomething(event); });
              if (i < 1){
                choiceLeft.appendChild(button);
              } else {
                choiceRight.appendChild(button);
              }
            }
          } break;
        }
      }
    }

    function doSomething(e){
      e = e || window.event;
    var target = e.target || e.srcElement;
    // console.log(target);
    findStory(target.id);
    }

    function findStory(tar){
      switch (tar){
        case "answer": {
          console.log("Answer the door");
        } break;
        case "ignore": {
          console.log("Ignore the knocks");
        }break;
        default: {
          console.log("Default");
        } break;
      }
    }

  var story;
  var combat;

  combatRequest.onload = function() {
    combat = combatRequest.response;
    console.log(combat);
  }

  storyRequest.onload = function() {
    story = storyRequest.response;
    console.log(story);

    menu.style.marginTop = "0";
    menu.innerHTML = "Menu";
    statusBar.style.height = "6em";
    choiceButtons.style.opacity = 1;

    start(storyContinue);

  }