let menuButton = document.getElementById("menuButton");
let userArea = document.getElementById("userArea");
let statusBar = document.getElementById("statusBar");
let storyArea = document.getElementById("storyArea");
let storyArea_P = document.querySelectorAll("#storyArea p");
let choiceButtons = document.getElementById("choiceButtons");
let menu = document.getElementById("menu");
let settingsButton = document.getElementById("settings");
let inventoryButton = document.getElementById("inventory");
let choices = document.getElementById("menuChoices");
let infoBars = document.getElementById("infoBars");
let closeMenu = document.getElementById("closeMenu");
let testDiv = document.getElementById("testDiv");
let settingsDiv = document.getElementById("settingsDiv");
let choiceLeft = document.getElementById("choiceLeft");
let choiceRight = document.getElementById("choiceRight");
let font16 = document.getElementById("font16");
let font20 = document.getElementById("font20");
let modifyFont = 0;
let reset = document.getElementById("reset");
let saveGame = document.getElementById("saveGame");
let loadGame = document.getElementById("loadGame");
let currentHP = document.getElementById("currentHP");
let currentMP = document.getElementById("currentMP");
let currentSP = document.getElementById("currentSP");
let hpBar = document.getElementById("hpbar2");
let mpBar = document.getElementById("mpbar2");
let spBar = document.getElementById("spbar2");
let maxHP = document.getElementById("maxHP");
let maxMP = document.getElementById("maxMP");
let maxSP = document.getElementById("maxSP");
let potions = document.getElementById("potions");
let ethers = document.getElementById("ethers");
let gems = document.getElementById("gems");
let salves = document.getElementById("salves");
let stimulants = document.getElementById("stimulants");
let usePotion = document.getElementById("usePotion");
let useEther = document.getElementById("useEther");
let useStim = document.getElementById("useStim");
let useWhiteGem = document.getElementById("useWhiteGem");
let closeItems = document.getElementById("closeItems");
let activeCombat = false;
let enemyIndex = "";

//Should only be changing the max values on level up
var character = {
  level: 1,
  xp: 0,
  hp: 100,
  mp: 20,
  sp: 50,
  maxHP: 100,
  maxMP: 20,
  maxSP: 50,
  potions: 3,   //Restores 50 hp
  ethers: 2,    //Restores 10 mp
  stimulants: 2, //Restores 15 sp
  whiteGems: 1, //Auto runs from any battle except bosses
  salves: 2     //Cures poison
};

var enemy = {
  maxHP: 0,
  currentHP: 0
};
//TODO: Figure out how to make your SP take 30 or 20 or some % of the total HP damage you take
function calcHP(){
  var result = (character.hp / character.maxHP) * 100;
  result = Math.trunc(result) + "%";
  return result;
}

function calcMP(){
  var result = (character.mp / character.maxMP) * 100;
  result = Math.trunc(result) + "%";
  return result;
}

function calcSP(){
  var result = (character.sp / character.maxSP) * 100;
  result = Math.trunc(result) + "%";
  return result;
}

let combatButtons = ['Melee', 'Item', 'Magic', 'Flee'];
let specialAttacks = ['Attack', 'Holy Strike', 'Critical Bash', 'Back'];

//Allows me to change and watch for changes via calling
//changeStat.hp or some other value from the character obj above
//Hopefully this will let me tie in with the values and make
//the hp bars movable and stuff

  /*/////////////////////////////////////////////////////////////////////////////
*   So all of this change stat stuff works. Use changeStat.hp or changeStat.mp
*   to change the value, and .maxMP etc to change the other values.
*
*   The bars get set to the current percentage of the max value, so if you had
*   100/115 HP, the red HP bar would get set to 86% width.
*
*   changeStat will have to be changed in combat whenever a value changes at all
*   to ensure the bars and values read correctly.
  *//////////////////////////////////////////////////////////////////////////////

var enemyStat = new Proxy(enemy, {
  set: function (target, key, value) {
    target[key] = value;
    return value;
  }
});

var changeStat = new Proxy(character, {
  set: function (target, key, value) {

      target[key] = value; //sets the value we put in

      switch (key){

      case "hp":{
        currentHP.innerText = value;
        hpBar.style.width = calcHP();
      } break;

      case "maxHP":{
        maxHP.innerText = "/ " + value;
      } break;

      case "mp":{
        currentMP.innerText = value;
        mpBar.style.width = calcMP();
      } break;

      case "maxMP":{
        maxMP.innerText = "/ " + value;
      } break;

      case "sp":{
        currentSP.innerText = value;
        spBar.style.width = calcSP();
      } break;

      case "maxSP":{
        maxSP.innerText = "/ " + value;
      } break;

      }
      return true;
  }
});

// targetProxy.hello_world = "test"; // console: 'hello_world set to test'





  /*/////////////////////////////////////////////////////////////////////////////
*   When opening the menu, change the menu button text to close,
*   slide the bar up and when closing, slide it back down and
*   if the choices are gone, put them back.
  *//////////////////////////////////////////////////////////////////////////////
menu.addEventListener("touchend", e => {

 if (menu.innerHTML === "Menu"){
    menu.innerHTML = "Close";
    statusBar.style.height = "10.7em";
    choiceButtons.style.opacity = 0;
  } else {
    menu.style.marginTop = "0";
    menu.innerHTML = "Menu";
    statusBar.style.height = "6em";
    choiceButtons.style.opacity = 1;
  }

});

closeMenu.addEventListener("touchend", e => {
  if (menuChoices.style.display == "none"){ //if not visible
      menuChoices.style.display = "flex" //make visible
      menu.style.display = "initial";
      menu.style.marginTop = "0";
      menu.innerHTML = "Menu";
      statusBar.style.height = "10.7em";
      choiceButtons.style.opacity = 1;
      closeMenu.style.display = "none";
      settingsDiv.style.display = "none";
      inventoryDiv.style.display = "none";
      menu.innerHTML = "Close";
      }
});

closeItems.addEventListener("touchend", e => {
  statusBar.style.height = "3.5em";
  useWhiteGem.disabled = true;
});

  /*/////////////////////////////////////////////////////////////////////////////
*   Handle opening the app settings menu
  *//////////////////////////////////////////////////////////////////////////////

settingsButton.addEventListener("touchend", e => {
  statusBar.style.height = "90%";
  menuChoices.style.display = "none";
  menu.style.display = "none";
  closeMenu.style.display = "block";
  settingsDiv.style.display = "block";
});

  /*/////////////////////////////////////////////////////////////////////////////
*   Handle opening the inventory screen
  *//////////////////////////////////////////////////////////////////////////////
 inventoryButton.addEventListener("touchend", e => {
  statusBar.style.height = "90%";
  menuChoices.style.display = "none";
  menu.style.display = "none";
  closeMenu.style.display = "block";
  inventoryDiv.style.display = "flex";
  potions.innerHTML = "Potions: " + character.potions;
  ethers.innerHTML = "Ethers: " + character.ethers;
  gems.innerHTML = "White Gems: " + character.whiteGems;
  salves.innerHTML = "Salves: " + character.salves;
  stimulants.innerHTML = "Stimulants: " + character.stimulants;
});

  /*/////////////////////////////////////////////////////////////////////////////
*   Using potion button in inv menu
  *//////////////////////////////////////////////////////////////////////////////
usePotion.addEventListener("touchend", e => {
  if (character.hp === character.maxHP) {
    //Do nothing is hp is full
    return;
  }
  if (character.potions - 1 >= 0){
    if (character.hp + 50 <= character.maxHP){
        changeStat.hp += 50;
        character.potions -= 1;
        potions.innerHTML = "Potions: " + character.potions;
        if (activeCombat === true){
          statusBar.style.height = "3.5em";
          useWhiteGem.disabled = true;
          setTimeout(function(){
            fight(enemyIndex);
            storyArea.scrollTo(0,document.body.scrollHeight);
        }, 750);
        }
    } else {
        changeStat.hp = character.maxHP;
        character.potions -= 1;
        potions.innerHTML = "Potions: " + character.potions;
        if (activeCombat === true){
          statusBar.style.height = "3.5em";
          useWhiteGem.disabled = true;
          setTimeout(function(){
            fight(enemyIndex);
            storyArea.scrollTo(0,document.body.scrollHeight);
        }, 750);
        }
    } 
  }
});

  /*/////////////////////////////////////////////////////////////////////////////
*   Using ether button in inv menu
  *//////////////////////////////////////////////////////////////////////////////
  useEther.addEventListener("touchend", e => {
    if (character.mp === character.maxMP) {
      //Do nothing is mp is full
      return;
    }
    if (character.ethers - 1 >= 0){    
      if (character.mp + 10 <= character.maxMP){
          changeStat.mp += 10;
          character.ethers -= 1;
          ethers.innerHTML = "Ethers: " + character.ethers;
          if (activeCombat === true){
            statusBar.style.height = "3.5em";
            useWhiteGem.disabled = true;
            setTimeout(function(){
              fight(enemyIndex);
              storyArea.scrollTo(0,document.body.scrollHeight);
          }, 750);
          }
      } else {
          changeStat.mp = character.maxMP;
          character.ethers -= 1;
          ethers.innerHTML = "Ethers: " + character.ethers;
          if (activeCombat === true){
            statusBar.style.height = "3.5em";
            useWhiteGem.disabled = true;
            setTimeout(function(){
              fight(enemyIndex);
              storyArea.scrollTo(0,document.body.scrollHeight);
          }, 750);
          }
      } 
    }
  });

  /*/////////////////////////////////////////////////////////////////////////////
*   Using stiumlant button in inv menu
  *//////////////////////////////////////////////////////////////////////////////
  useStim.addEventListener("touchend", e => {
    if (character.sp === character.maxSP) {
      //Do nothing is sp is full
      return;
    }
    if (character.stimulants - 1 >= 0){    
      if (character.sp + 15 <= character.maxSP){
          changeStat.sp += 15;
          character.stimulants -= 1;
          stimulants.innerHTML = "Stimulants: " + character.stimulants;
          if (activeCombat === true){
            statusBar.style.height = "3.5em";
            useWhiteGem.disabled = true;
            setTimeout(function(){
              fight(enemyIndex);
              storyArea.scrollTo(0,document.body.scrollHeight);
          }, 750);
          }
      } else {
          changeStat.sp = character.maxSP;
          character.stimulants -= 1;
          stimulants.innerHTML = "Stimulants: " + character.stimulants;
          if (activeCombat === true){
            statusBar.style.height = "3.5em";
            useWhiteGem.disabled = true;
            setTimeout(function(){
              fight(enemyIndex);
              storyArea.scrollTo(0,document.body.scrollHeight);
          }, 750);
          }
      } 
    }
  });

  useWhiteGem.addEventListener("touchend", e => {
    if (character.whiteGems - 1 >= 0){
      if (useWhiteGem.disabled){
        return;
      } else {
        changeStat.whiteGems -= 1;
        // character.stimulants -= 1;
        gems.innerHTML = "White Gems: " + character.whiteGems;
        //Should end combat via flee
        console.log("White Gem consumed, fleeing from combat...");
      }
    }
  });

  /*/////////////////////////////////////////////////////////////////////////////
*   Pressing save
  *//////////////////////////////////////////////////////////////////////////////
  saveGame.addEventListener("touchend", e => {
    console.log("I don't do anything yet.")
  });

  /*/////////////////////////////////////////////////////////////////////////////
*   Pressing load
  *//////////////////////////////////////////////////////////////////////////////
  loadGame.addEventListener("touchend", e => {
    console.log("I don't do anything yet.")
  });

  /*/////////////////////////////////////////////////////////////////////////////
*   Changing font to 16 (default)   
  *//////////////////////////////////////////////////////////////////////////////
 font16.addEventListener("touchend", e => {
  storyArea_P = document.querySelectorAll("#storyArea p");
  let i = 0;
  let length = storyArea_P.length;
  for (; i < length; i++){
    storyArea_P[i].style.fontSize = "16px";
  }
  modifyFont = 0;
 });

   /*/////////////////////////////////////////////////////////////////////////////
*   Changing font to 20
  *//////////////////////////////////////////////////////////////////////////////
 font20.addEventListener("touchend", e => {
  storyArea_P = document.querySelectorAll("#storyArea p");
  let i = 0;
  let length = storyArea_P.length;
  for (; i < length; i++){
    storyArea_P[i].style.fontSize = "20px";
  }
  modifyFont = 1;
 });

  /*/////////////////////////////////////////////////////////////////////////////
*   Reset Button
  *//////////////////////////////////////////////////////////////////////////////
  reset.addEventListener("touchend", e => {
   let t = window.confirm("Are you sure you want to reset?"
   + "\nThis will start the story from the beginning");
    if (t == true){
      start();
      //Should probably reset all items and stuff to the base values as well,
      //if that isn't already being done on the start() method
    } else {
      //do nothing
    }
  });
 
  function setColor() {
    var x = document.body;
    x.style.backgroundColor = x.style.backgroundColor == "lightgrey" ? "red" : "lightgrey";
  }

  //Call this whenever you get hurt in battle. Takes paramater of damage taken
  function hit(damage){
   var flash = setInterval(setColor, 50);
   var body = document.body;
    changeStat.hp -= damage;
   setTimeout(function(){
     clearInterval(flash);
       body.style.background = "lightgrey";
   }, 300);
  }

  /*/////////////////////////////////////////////////////////////////////////////
*   Load the combat attack, magic, item and flee buttons,
*   and set functions on them via pass in id to switch
  *//////////////////////////////////////////////////////////////////////////////
  function loadCombatButtons(enemyChoice){
    
    choiceLeft.innerHTML = "";
    choiceRight.innerHTML = "";
    
    for(k in combatButtons){
      var button = document.createElement("button");
      var text = document.createTextNode(combatButtons[k]);
      button.setAttribute("id", combatButtons[k].toLocaleLowerCase());
      button.appendChild(text);
      button.addEventListener("touchend", e => { combatID(event, enemyChoice); });
      button.style.width = "8em";
      button.style.height = "3.5em";
      if (k < 2){
        choiceLeft.appendChild(button);
      } else {
        choiceRight.appendChild(button);
      }
    }
  }

  /*/////////////////////////////////////////////////////////////////////////////
*   Load in the special attack buttons when you press the attack button
  *//////////////////////////////////////////////////////////////////////////////
  function loadAttackButtons(enemyIndex){

    if (storyArea.hasChildNodes()){
      choiceLeft.innerHTML = "";
      choiceRight.innerHTML = "";
    }

    for(k in specialAttacks){
      var button = document.createElement("button");
      var text = document.createTextNode(specialAttacks[k]);
      button.setAttribute("id", specialAttacks[k].toLocaleLowerCase());
      button.appendChild(text);
      button.addEventListener("touchend", e => { combatID(event, enemyIndex); });
      button.style.width = "8em";
      button.style.height = "3.5em";
      if (k < 2){
        choiceLeft.appendChild(button);
      } else {
        choiceRight.appendChild(button);
      }
    }
  }

  /*/////////////////////////////////////////////////////////////////////////////
*   The encounter function chooses the enemy you run in to and
*   introduces it and passes said index to the fight function, which
*   has the enemy actually attack you
  *//////////////////////////////////////////////////////////////////////////////
    // function encounter(){
  //     let enemyChoice = Math.floor((Math.random() * 2));
  //     var p = document.createElement("p");
  //     var content = "";

  //     let enemyHP = combat[enemyChoice].health;

  //   switch (enemyChoice){
  //     case 0:
  //       content = document.createTextNode("A " + combat[enemyChoice].displayName + " oozes up before you!");
  //     break;

  //     case 1:
  //       content = document.createTextNode("A " + combat[enemyChoice].displayName + " shambles toward you!");
  //     break;
  //   }
  //    p.appendChild(content);
  //    storyArea.appendChild(p);
  //   //After loading in the enemy choice, call the fight function, passing in enemyHP & index
  //   // that has the enemy try to attack 
  //    fight(enemyHP, enemyChoice);
  // }

     function fight(enemyChoice){

      if (enemyStat.currentHP === 0){
        console.log("enemy gets a free attack then dies");
        //endCombat()
        console.log("You should take more damage here");
        return;
      }

      var p = document.createElement("p");
      var content = "";

      let hitChance = Math.floor(Math.random() * 100) + 1;
      if (hitChance <=80){ //80% chance to hit
        content = document.createTextNode(combat[enemyChoice].displayName + " attacks!");
        p.appendChild(content);
        storyArea.appendChild(p);
        let damage = (Math.floor(Math.random() * combat[enemyChoice].attack) + 1);
        hit(damage); //If enemy hits you take damge
        content = document.createTextNode(" You take " + damage + " damage!");
        p.appendChild(content);
        storyArea.appendChild(p);
      } else { //Otherwise display miss
        content = document.createTextNode(combat[enemyChoice].displayName + " attacks but misses!");
        p.appendChild(content);
        storyArea.appendChild(p);
      }
     }

     function attack(enemyChoice){
      var p = document.createElement("p");
      var content = document.createTextNode("You attack!");
      p.appendChild(content);
      storyArea.appendChild(p);

      let hitChance = Math.floor(Math.random() * 100) + 1;
      if (hitChance <=80){ //80% chance to hit
        let damage = (Math.floor(Math.random() * 8) + 1);
        let deduction = combat[enemyChoice].defense;
        damage -= deduction;
        //To make sure you can't deal less than 0 damage
        if (damage <= 0){
          damage = 1;
        }
        // let damage = 10;
        content = document.createTextNode(" Hit! You deal " + damage + " damage!");
        
        console.log("before " + enemyStat.currentHP);
        enemyStat.currentHP -= damage;
        console.log("after " + enemyStat.currentHP);

        p.appendChild(content);
        storyArea.appendChild(p);
        
        if (enemyStat.currentHP < 0){
          console.log("enemy is dead");
          // endCombat(); //undefined
          //TODO: This needs to display to the screen that the enemy is dead and
          // not return to enemy getting free attack
          // return;
        }

        // TODO: create an inventory object to hold inventory
        // stuff instead of relying on the character object

        setTimeout(function(){
          fight(enemyChoice);
          storyArea.scrollTo(0,document.body.scrollHeight);
      }, 750);
      } else {
        content = document.createTextNode("Miss!");
        p.appendChild(content);
        storyArea.appendChild(p);
        setTimeout(function(){
          fight(enemyChoice);  
          storyArea.scrollTo(0,document.body.scrollHeight);
      }, 750);
      }
     }

  /*/////////////////////////////////////////////////////////////////////////////
*   Make the combat buttons function properly
  *//////////////////////////////////////////////////////////////////////////////
  function combatID(e, enemyChoice){
    e = e || window.event;
  var target = e.target || e.srcElement;
  //TODO: Make the endCombat function
  //FIXME: Also figure out how to make the display text not all be on the same line

  switch(target.id){
    case "melee":
      loadAttackButtons(enemyIndex);
    break;

    case "attack":
      attack(enemyChoice);
      storyArea.scrollTo(0,document.body.scrollHeight);
      loadCombatButtons(enemyChoice);
    break;

    case "critical bash":
      console.log("Critical Bash");
    break;

    case "holy strike":
      console.log("Holy Strike");
    break;

    case "back":
    loadCombatButtons(enemyChoice);
    break;

    case "magic":  

    break;

    case "item":
    useWhiteGem.disabled = false;
    statusBar.style.height = "50%";
    menuChoices.style.display = "none";
    menu.style.display = "none";
    closeItems.style.display = "block";
    inventoryDiv.style.display = "flex";
    inventoryDiv.style.marginBottom = "1em";
    potions.innerHTML = "Potions: " + character.potions;
    ethers.innerHTML = "Ethers: " + character.ethers;
    gems.innerHTML = "White Gems: " + character.whiteGems;
    salves.innerHTML = "Salves: " + character.salves;
    stimulants.innerHTML = "Stimulants: " + character.stimulants;
    break;

    case "flee":
      let fleeChance = Math.floor(Math.random() * 20) + 1;
      if (fleeChance <= 10){
        //flee
        //endCombat();
      } else {
        //don't flee
      }
    break;
  }

  }

  /*/////////////////////////////////////////////////////////////////////////////
*   loadCombat prepares the screen for combat, dropping the status bar height
*   and loading the combat buttons, chooses the enemy you fight and gets the hp
  *//////////////////////////////////////////////////////////////////////////////
  function loadCombat(){
    if (storyArea.hasChildNodes()){
      storyArea.innerHTML = "";
      choiceLeft.innerHTML = "";
      choiceRight.innerHTML = "";
    }

    statusBar.style.height = "3.5em";

    let enemyChoice = Math.floor((Math.random() * 2));
      var p = document.createElement("p");
      var content = "";

      //Resets the enemy health to the max
      let enemyMaxHp = combat[enemyChoice].maxHP;
      let enemyHP = combat[enemyChoice].currentHP;
      enemyHP = enemyMaxHp;
      
      enemyStat.maxHP = enemyMaxHp;
      enemyStat.currentHP = enemyHP;

      enemyHp = enemyStat.currentHP;


    switch (enemyChoice){
      case 0:
        content = document.createTextNode("A " + combat[enemyChoice].displayName + " oozes up before you!");
      break;

      case 1:
        content = document.createTextNode("A " + combat[enemyChoice].displayName + " shambles toward you!");
      break;
    }
     p.appendChild(content);
     storyArea.appendChild(p);
    //After loading in the enemy choice, call the fight function, passing in enemyHP & index
    // that has the enemy try to attack 

    loadCombatButtons(enemyChoice);
    activeCombat = true; //TODO: Make sure to turn off active combat when enemy dies

    fight(enemyChoice);

    return enemyChoice;

  }

//Load in the required JSON files
  // var requestURL = 'http://127.0.0.1:5500/story.json';
  var requestURL = 'story.json';
  var storyRequest = new XMLHttpRequest();
  storyRequest.open('GET', requestURL);
  storyRequest.responseType = 'json';
  storyRequest.send();

  // var requestURL2 = 'http://127.0.0.1:5500/combat.json';
  var requestURL2 = 'combat.json';
  var combatRequest = new XMLHttpRequest();
  combatRequest.open('GET', requestURL2);
  combatRequest.responseType = 'json';
  combatRequest.send();

  /*/////////////////////////////////////////////////////////////////////////////
*   The start function just pulls from the story[0] array
*   and the button will move on to the next section
  *//////////////////////////////////////////////////////////////////////////////
 function start(){

  character.level = 1;
  character.xp = 0;
  character.hp = 100;
  character.mp = 20;
  character.sp = 50;
  character.maxHP = 100;
  character.maxMP = 20;
  character.maxSP = 50;
  character.potions = 3;
  character.ethers = 2;
  character.whiteGems = 1;
  character.salves = 2;
  changeStat.hp = character.maxHP;
  changeStat.mp = character.maxMP;
  changeStat.sp = character.maxSP;

  if (storyArea.hasChildNodes()){
    storyArea.innerHTML = "";
    choiceLeft.innerHTML = "";
    choiceRight.innerHTML = "";
  }

  for (k in story[0].text) {

    var p = document.createElement("p");
    p.setAttribute("class", "story");
    var content = document.createTextNode(story[0].text[k]);
    p.appendChild(content);
    storyArea.appendChild(p);
  }

    var button = document.createElement("Button");
    button.setAttribute("id", story[0].choice[0].id);
    var text = document.createTextNode(story[0].choice[0].title);
    button.appendChild(text);
    choiceLeft.appendChild(button);

    button.addEventListener("touchend", e => { getStoryID(event); });

}

  /*/////////////////////////////////////////////////////////////////////////////
*   getStoryID grabs the ID of the button from the touchend event
*   and sends it to the findStory function
  *//////////////////////////////////////////////////////////////////////////////
    function getStoryID(e){
      e = e || window.event;
    var target = e.target || e.srcElement;
    // console.log(target.id);
    findStory(target.id);
    }

  /*/////////////////////////////////////////////////////////////////////////////
*   the findStory function uses the ID of the button
*   and matches it with the object ID in the JSON file.
*   The index of the right object in the JSON array
*   is then sent to the loadStory function
*
*   If the ID is a combat ID, call the combat function.
*   Normally probably pass in a random number so the
*   monster is different. I need to set that up. For
*   now, the combatTutorial just calls the function
*   without anything.
  *//////////////////////////////////////////////////////////////////////////////
    function findStory(id){
      if (id === "combatTutorial"){
       enemyIndex = loadCombat();
      }
      let length = story.length;
      for (let i = 0; i < length; i++){
        if (story[i].id === id){
          loadStory(i)
          return;
        }
      }

    }
  /*/////////////////////////////////////////////////////////////////////////////
*   loadStory, equipped with the correct index in the JSON file
*   of the next story part then removes the current button and story,
*   and loads in the new info.
*   New buttons are then created off of the choices in the current index
*   with new id's and the process starts over again when a button is pressed
  *//////////////////////////////////////////////////////////////////////////////
    function loadStory(storyID){

      //Remove the story from storyArea
      if (storyArea.hasChildNodes()){
        storyArea.innerHTML = "";
        choiceLeft.innerHTML = "";
        choiceRight.innerHTML = "";
      }

      //Load in the next story section from the ID we got from before
      for (k in story[storyID].text) {
        var p = document.createElement("p");
        var content = document.createTextNode(story[storyID].text[k]);
        p.appendChild(content);
        storyArea.appendChild(p);
        if (storyID == 3 || storyID == 4){
        }
      }

      //FIXME: Figure out why the font isn't staying 20pt when combat starts.
      storyArea_P = document.querySelectorAll("#storyArea p");
      if (modifyFont == 1){
        let length = storyArea_P.length;
        for (let i = 0; i < length; i++){
          storyArea_P[i].style.fontSize = "20px";
        }
      } else {
        let length = storyArea_P.length;
        for (let i = 0; i < length; i++){
          storyArea_P[i].style.fontSize = "16px";
        }
      }

      let choices = story[storyID].choice.length
      switch (choices){
        case 1: {
          for (var i = 0; i < choices; i++){
            var button = document.createElement("button");
            button.setAttribute("id", story[storyID].choice[i].id);
            var text = document.createTextNode(story[storyID].choice[i].title);
            button.appendChild(text);
            button.addEventListener("touchend", e => { getStoryID(event); });
            choiceLeft.appendChild(button);
          }
        } break;

        case 2: {
          for (var i = 0; i < choices; i++){
            var button = document.createElement("button");
            button.setAttribute("id", story[storyID].choice[i].id);
            var text = document.createTextNode(story[storyID].choice[i].title);             
            button.appendChild(text);
            button.addEventListener("touchend", e => { getStoryID(event); });
            if (i < 1){
              choiceLeft.appendChild(button);
            } else {
              choiceRight.appendChild(button);
            }
          }
        } break;

        case 3: {
          for (var i = 0; i < choices; i++){
            var button = document.createElement("button");
            var text = document.createTextNode(story[storyID].choice[i]);
            button.appendChild(text);
            button.addEventListener("touchend", e => { getStoryID(event); });
            if (i < 2){
              choiceLeft.appendChild(button);
            } else {
              choiceRight.appendChild(button);
            }
          }
      } break;

      case 4: {
        for (var i = 0; i < choiceNum; i++){
          var button = document.createElement("button");
          var text = document.createTextNode(story[storyID].choice[i]);
          button.appendChild(text);
          button.addEventListener("touchend", e => { getStoryID(event); });
          if (i < 2){
            choiceLeft.appendChild(button);
          } else {
            choiceRight.appendChild(button);
          }
        }
      } break;
    }
  }


    //////////////////////////////////////////////////////////////

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

    start();

  }