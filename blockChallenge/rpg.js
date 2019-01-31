let menuButton = document.getElementById("menuButton");
let userArea = document.getElementById("userArea");
let statusBar = document.getElementById("statusBar");
let storyArea = document.getElementById("storyArea");
let choiceButtons = document.getElementById("choiceButtons")
.querySelectorAll("button");
let menu = document.getElementById("menu");
let settingsButton = document.getElementById("settings");

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

settingsButton.addEventListener("touchend", e => {
  statusBar.style.height = "90%";
});


  var requestURL = 'http://127.0.0.1:5500/test.json';
  var request = new XMLHttpRequest();
  request.open('GET', requestURL);
  request.responseType = 'json';
  request.send();

  var superHeroes;

  request.onload = function() {
    superHeroes = request.response;
    console.log(superHeroes);
  }
