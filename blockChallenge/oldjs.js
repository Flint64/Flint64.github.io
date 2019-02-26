function tutorialFight(){
     //Decide if you or the enemy attack first and load enemy text based on result
    let attackFirst = Math.floor(Math.random() * 20) + 1;
    //Even or odd, so 50% chance
    if (attackFirst % 2 === 0){
    var p = document.createElement("p");
    var content = document.createTextNode("A " + combat[0].displayName + " oozes up before you!");
    p.appendChild(content);
    storyArea.appendChild(p);
    } else {
      var p = document.createElement("p");
      var content = document.createTextNode("A " + combat[0].displayName + " somehow gets the jump on you!");
      p.appendChild(content);
      storyArea.appendChild(p);

     var content = document.createTextNode(combat[0].displayName + " attacks!");
     var p = document.createElement("p");
     p.appendChild(content);
     storyArea.appendChild(p);

     //right now weak slime always hits if it attacks first.
     //That's fine, as long as it gets changed for later combat,
     //but for the tutorial it's alright

     let attack = Math.floor(Math.random() * 8) + 1;
      changeStat.hp = character.maxHP - attack;
      hit();

      content = document.createTextNode("You take " + attack + " damage from " + combat[0].displayName);
      p = document.createElement("p");
      p.appendChild(content);
      storyArea.appendChild(p);
    }    
  }