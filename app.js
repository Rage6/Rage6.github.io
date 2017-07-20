console.log('testing');

$(()=>{

  alert("Welcome to Yahtzee!")
  //Here, we get into assigning someone's name to user 1 and user 2
  const askName1 = ()=>{
    return prompt("Player 1: What is your preferred name?");
  }
  const askName2 = ()=>{
    return prompt("Player 2: What is your preferred name?",);
  }

  //Insert the two players' names
  const user1 = askName1();
  const user2 = askName2();

  alert("Now we're ready to play! " + user1 + " will go first. During each turn, the player can roll the dice three times. Simply click any die in order to prevent it from being rolled. All selected die will be shaded grey. Once you have selected the dice that you want to use for points, click 'Submit'. When the next player (in this case, " + user2 + ") is ready to start their turn, they need only click 'Next Turn'. Good luck!")

  //'trigger' will is part of clicking on/off of dice
  let trigger = true;
  let user1Total = 0;
  let user2Total = 0;
  let pickedFirst = false;
  let pickedSecond = false;
  let pickedThird = false;
  let pickedFourth = false;
  let pickedFifth = false;
  let choice = 'test';
  let scoreTotal = 0;
  let selectedArray = [];
  let player = true;
  let currentPlayer = '';

  //This displays the names and values on the website
  $('#name1').text(user1);
  $('#name2').text(user2);
  $('#total1').text(user1Total);
  $('#total2').text(user2Total);

  const userOneOptions = {
    'name': user1,
    'total': 0,
    'aces': 0,
    'twos': 0,
    'threes': 0,
    'fours': 0,
    'fives': 0,
    'sixes': 0,
    'chance': 0,
    'yahtzee': 0
  }

  const userTwoOptions = {
    'name': user2,
    'total': 0,
    'aces': 0,
    'twos': 0,
    'threes': 0,
    'fours': 0,
    'fives': 0,
    'sixes': 0,
    'chance': 0,
    'yahtzee': 0
  }

  //This is how to switch between the users' objects.
  const switchPlayers = ()=>{
    if (player == true) {
      currentPlayer = userOneOptions;
      player = false;
    } else {
      currentPlayer = userTwoOptions;
      player = true;
    }
  }

  console.log(currentPlayer.name)
  switchPlayers();
  console.log(currentPlayer.name)

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
      pickedFirst = true;
      first.css('background-color','grey');
      trigger = false;
    } else {
      pickedFirst = false;
      first.css('background-color','white');
      trigger = true;
    }
  })

  const second = $('#second')
  second.on('click',()=>{
    if (trigger == true) {
      pickedSecond = true;
      second.css('background-color','grey');
      trigger = false;
    } else {
      pickedSecond = false;
      second.css('background-color','white');
      trigger = true;
    }
  })

  const third = $('#third')
  third.on('click',()=>{
    if (trigger == true) {
      pickedThird = true;
      third.css('background-color','grey');
      trigger = false;
    } else {
      pickedThird = false;
      third.css('background-color','white');
      trigger = true;
    }
  })

  const fourth = $('#fourth')
  fourth.on('click',()=>{
    if (trigger == true) {
      pickedFourth = true;
      fourth.css('background-color','grey');
      trigger = false;
    } else {
      pickedFourth = false;
      fourth.css('background-color','white');
      trigger = true;
    }
  })

  const fifth = $('#fifth')
  fifth.on('click',()=>{
    if (trigger == true){
      pickedFifth = true;
      fifth.css('background-color','grey');
      trigger = false;
    } else {
      pickedFifth = false;
      fifth.css('background-color','white');
      trigger = true;
    }
  })

  //You can use this function to shuffle all of them at once, except for the ones in which 'picked' == true
  const shuffleAllDice = ()=>{
    if (pickedFirst === false) {
      makeNum(first);
    };
    if (pickedSecond === false) {
      makeNum(second);
    };
    if (pickedThird === false) {
      makeNum(third);
    };
    if (pickedFourth === false) {
      makeNum(fourth);
    };
    if (pickedFifth === false) {
      makeNum(fifth);
    };
  }



  //This function is used after the user decides on which dice values they want. It takes those values, converts them back into numbers, and place it all in an array
  const submitValues = ()=>{
    if (pickedFirst === true) {
      const firstValue = parseInt($('#first').text(),10);
      selectedArray.push(firstValue);
    };
    if (pickedSecond === true) {
      const secondValue = parseInt($('#second').text(),10);
      selectedArray.push(secondValue);
    };
    if (pickedThird === true) {
      const thirdValue = parseInt($('#third').text(),10);
      selectedArray.push(thirdValue);
    };
    if (pickedFourth === true) {
      const fourthValue = parseInt($('#fourth').text(),10);
      selectedArray.push(fourthValue);
    };
    if (pickedFifth === true) {
      const fifthValue = parseInt($('#fifth').text(),10);
      selectedArray.push(fifthValue);
    };
    console.log(selectedArray);
    console.log(choice);
    checkValues();
    //check to see if user has already used that category
    turnTotal();
    console.log(scoreTotal)
    //add total to user's total score
  }

  //This is for the "Submit Points" button
  const pointsButton = $('#pointsButton');
  pointsButton.on('click',submitValues);

  //These allow the user to choose which
  const chooseAces = $('#aces');
  chooseAces.on('click', ()=>{
    choice = 'aces';
  });
  const chooseTwos = $('#twos');
  chooseTwos.on('click', ()=>{
    choice = 'twos';
  });
  const chooseThrees = $('#threes');
  chooseThrees.on('click', ()=>{
    choice = 'threes'
  });
  const chooseFours = $('#fours');
  chooseFours.on('click', ()=>{
    choice = 'fours'
  });
  const chooseFives = $('#fives');
  chooseFives.on('click', ()=>{
    choice = 'fives'
  });
  const chooseSixes = $('#sixes');
  chooseSixes.on('click', ()=>{
    choice = 'sixes'
  });
  const chooseChance = $('#chance');
  chooseChance.on('click', ()=>{
    choice = 'chance'
  });
  const chooseYahtzee = $('#yahtzee');
  chooseYahtzee.on('click', ()=>{
    choice = 'yahtzee'
  });

  //This function (which is inserted the above 'submitValues' function) confirms that the the values submitted meet all of the requirements.
  const checkValues = ()=>{
    if (choice == 'aces'){
      for (let i = 0; i < selectedArray.length; i++){
        if (selectedArray[i] != 1) {
          alert("The chosen dice do not work for the option that you have selected.");
          selectedArray = [];
        } else {
          console.log('Passed inspection')
        }
      }
    } else if (choice == 'twos'){
      for (let i = 0; i < selectedArray.length; i++){
        if (selectedArray[i] != 2) {
          alert("The chosen dice do not work for the option that you have selected.")
          selectedArray = []
        } else {
          console.log('Passed inspection')
        }
      }
    } else if (choice == 'threes'){
      for (let i = 0; i < selectedArray.length; i++){
        if (selectedArray[i] != 3) {
          alert("The chosen dice do not work for the option that you have selected.")
          selectedArray = []
        } else {
          console.log('Passed inspection')
        }
      }
    } else if (choice == 'fours'){
      for (let i = 0; i < selectedArray.length; i++){
        if (selectedArray[i] != 4) {
          alert("The chosen dice do not work for the option that you have selected.")
          selectedArray = []
        } else {
          console.log('Passed inspection')
        }
      }
    } else if (choice == 'fives'){
      for (let i = 0; i < selectedArray.length; i++){
        if (selectedArray[i] != 5) {
          alert("The chosen dice do not work for the option that you have selected.")
          selectedArray = []
        } else {
          console.log('Passed inspection')
        }
      }
    } else if (choice == 'sixes'){
      for (let i = 0; i < selectedArray.length; i++){
        if (selectedArray[i] != 6) {
          alert("The chosen dice do not work for the option that you have selected.")
          selectedArray = []
        } else {
          console.log('Passed inspection')
        }
      }
    } else if (choice == 'chance'){
      for (let i = 0; i < selectedArray.length; i++){
        if (selectedArray.length < 5) {
          alert("Select all die when using the 'Chance' option.")
          selectedArray = []
        } else {
          console.log('Passed inspection')
        }
      }
    } else {
      alert('Please select your category.')
      selectedArray = [];
    }
  }

  //After the game knows that the user has followed the rules, this function will get the total sum of an array
  const turnTotal = ()=>{
    scoreTotal = 0;
    for (let i = 0; i < selectedArray.length; i++){
      scoreTotal+=selectedArray[i];
    }
  }

  //Now we can assign a button to shuffling everything
  const shuffleButton = $('#shuffle');
  shuffleButton.on('click',shuffleAllDice);

  $('#name1').text(user1);
  $('#name2').text(user2);
  $('#total1').text(user1Total);
  $('#total2').text(user2Total);

})
