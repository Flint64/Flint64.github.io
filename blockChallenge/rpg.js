let menuButton = document.getElementById("menuButton");
let userArea = document.getElementById("userArea");
let statusBar = document.getElementById("statusBar");
let storyArea = document.getElementById("storyArea");
let choiceButtons = document.getElementById("choiceButtons");
let menu = document.getElementById("menu");
let settingsButton = document.getElementById("settings");
let choiceLeft = document.getElementById("choiceLeft");
let choices = document.getElementById("menuChoices");

/*
menuButton.addEventListener("touchend", e => {
  let i = 0,
    length = choiceButtons.length;
    menu.innerHTML = "Close";
  if (choiceButtons[0].style.opacity == 1) {
    statusBar.style.height = "10.7em";

    for (i = 0; i < length; i++) {
      choiceButtons[i].style.opacity = 0;
    }
  } else {
    statusBar.style.height = "6em";
    menu.innerHTML = "Menu";
    for (i = 0; i < length; i++) {
      choiceButtons[i].style.opacity = 1;
    }
  }
});
*/

menuButton.addEventListener("touchend", e => {

  if (choiceButtons.style.opacity == 1){
    menu.innerHTML = "Close";
    statusBar.style.height = "10.7em";
    choiceButtons.style.opacity = 0;
  } else {
    menu.innerHTML = "Menu";
    statusBar.style.height = "6em";
    choiceButtons.style.opacity = 1;
  }

});

settingsButton.addEventListener("touchend", e => {
  statusBar.style.height = "90%";
});


  var requestURL = 'http://127.0.0.1:5500/test.json';
  var request = new XMLHttpRequest();
  request.open('GET', requestURL);
  request.responseType = 'json';
  request.send();

  /*
*   Creates the story variable to hold the JSON object,
*   then loops through the first instance of the object
*   and grabs the text and creates a <p> for each one and
*   puts the text into the page then puts the <p> into the page
  */

//Story[0] is just the first array.
 function start() {
  for (k in story[0].text) {
    var p = document.createElement("p");
    var content = document.createTextNode(story[0].text[k]);
    p.appendChild(content);
    storyArea.appendChild(p);
    }

    if (story[0].continue == true){
      var button = document.createElement("Button");
      var text = document.createTextNode("Continue");
      button.appendChild(text);
      choiceButtons.appendChild(button);
    } else {
      for (var i = 0; i < story[0].choice.length / 2; i++){
        var button = document.createElement("Button");
        var text = document.createTextNode(story[1].choice[i]);
        button.appendChild(text);
        choiceLeft.appendChild(button);
      }
      for (var i = 0; i < story[0].choice.length / 2; i++){
        var button = document.createElement("Button");
        var text = document.createTextNode(story[1].choice[i]);
        button.appendChild(text);
        choiceRight.appendChild(button);
      }
    }
  }

  var story;

  request.onload = function() {
    story = request.response;
    console.log(story);

    start();

  }