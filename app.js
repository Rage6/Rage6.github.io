console.log('testing');

$(()=>{

  //'trigger' will is part of clicking on/off of dice
  let trigger = true;

  //This generates an integer between 1 and 6
  const rollDice = ()=>{
    min = Math.ceil(1);
    max = Math.floor(7);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  //This will randomly assign a number, between 1 and 6, to the dice 'diceNum'
  const makeNum = (diceNum)=>{
    const check = rollDice().toString()
    diceNum.text(check);
  }

  //The following 5 groups use can make a dice go grey and assign it a boolean
  const first = $('#first')
  first.on('click',()=>{
    if (trigger == true) {
      picked = true;
      first.css('background-color','grey');
      trigger = false;
    } else {
      picked = false;
      first.css('background-color','white');
      trigger = true;
    }
  })

  const second = $('#second')
  second.on('click',()=>{
    if (trigger == true) {
      second.css('background-color','grey');
      trigger = false;
    } else {
      second.css('background-color','white');
      trigger = true;
    }
  })

  const third = $('#third')
  third.on('click',()=>{
    if (trigger == true) {
      third.css('background-color','grey');
      trigger = false;
    } else {
      third.css('background-color','white');
      trigger = true;
    }
  })

  const fourth = $('#fourth')
  fourth.on('click',()=>{
    if (trigger == true) {
      fourth.css('background-color','grey');
      trigger = false;
    } else {
      fourth.css('background-color','white');
      trigger = true;
    }
  })

  const fifth = $('#fifth')
  fifth.on('click',()=>{
    if (trigger == true){
      fifth.css('background-color','grey');
      trigger = false;
    } else {
      fifth.css('background-color','white');
      trigger = true;
    }
  })

  //You can use this function to shuffle all of them at once
  const shuffleAllDice = ()=>{
    makeNum(first);
    makeNum(second);
    makeNum(third);
    makeNum(fourth);
    makeNum(fifth);
  }

  //Now we can assign a button to shuffling everything
  const shuffleButton = $('#shuffle');
  shuffleButton.on('click',shuffleAllDice);

  //Here, we get into assigning someone's name to user 1 and user 2
  const askName = ()=>{
    return prompt("What is your preferred name, player?");
  }

// //These turn the usees
// const user1 = askName();
// const user2 = askName();


})
