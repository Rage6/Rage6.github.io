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
  let pickedFirst = false;
  let pickedSecond = false;
  let pickedThird = false;
  let pickedFourth = false;
  let pickedFifth = false;
  let choice = 'test';
  let scoreTotal = 0;
  let selectedArray = [];
  let toSwitchPlayer = false;
  let howManyRolls = 1;
  let hasSubmit = false;
  let roundReset = 0;
  let round = 1;
  let firstSubmit = true;

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

  //All of these have to follow the two user objects
  //Display the names on the website
  $('#name1').text(userOneOptions.name);
  $('#name2').text(userTwoOptions.name);
  //This sets the first player
  let currentPlayer = userOneOptions;
  //These display the total of each player's total. The functions are used again in 'submitValues' in order to update the total
  const displayTotal1 = ()=>{
    $('#total1').text(userOneOptions.total);
  }
  const displayTotal2 = ()=>{
    $('#total2').text(userTwoOptions.total);
  }
  const displayRound = ()=>{
    $('#round').text(round);
  }
  displayTotal1();
  displayTotal2();
  displayRound();

  //This is how to switch between the users' objects.
  const switchPlayers = ()=>{
    if (round <= 8) {
      if (hasSubmit == true) {
        if (toSwitchPlayer == true) {
          currentPlayer = userOneOptions;
          $('#name1').css('background-color','yellow');
          $('#name2').css('background-color','peru');
          howManyRolls = 1;
          toSwitchPlayer = false;
          hasSubmit = false;
          howManyRolls = 1;
        } else {
          currentPlayer = userTwoOptions;
          $('#name2').css('background-color','yellow');
          $('#name1').css('background-color','peru');
          howManyRolls = 1;
          toSwitchPlayer = true;
          hasSubmit = false;
        };
        adjustRound();
        choice = 'test';
        firstSubmit = true;
        $('#first').text('');
        $('#second').text('');
        $('#third').text('');
        $('#fourth').text('');
        $('#fifth').text('');
      } else {
        alert("Sorry, but the current player must submit their points before the next turn can begin.")
      }
    } else {
      findWinnerName();
    }
  }

  //Use this to determine the name of the winner.
  const findWinnerName = ()=>{
    const difference = Math.abs(userOneOptions.total - userOneOptions.total);
    if (userOneOptions.total > userTwoOptions.total) {
      alert('Congratulations, '+userOneOptions.name+'! You won, defeating '+userTwoOptions.name+' by '+difference+' points.');
    } else if (userOneOptions.total < userTwoOptions.total) {
      alert('Congratulations, '+userTwoOptions.name+'! You won, defeating '+userOneOptions.name+' by '+difference+' points.')
    } else {
      alert("You two tied?! That's amazing! You must each be equally good!")
    }
  }

  //This simply attaches switchPlayers to the 'Next Turn' button
  const nextTurn = $('#startButton');
  nextTurn.on('click',switchPlayers);

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

  //The following 5 groups can make a dice go grey and assign it a boolean
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
    if (howManyRolls <= 3) {
      const displayRolls = $('#rolls');
      displayRolls.text(howManyRolls);
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
      howManyRolls++;
    } else {
      alert("You have run out of rolls. Please choose your preferred option and submit your selected points.")
    }
  }

  //This function is used after the user decides on which dice values they want. It takes those values, converts them back into numbers, and place it all in an array
  const submitValues = ()=>{
    console.log($("#userOneAces"));
    confirmEmpty();
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
    checkValues();
    turnTotal();
    addToTotal();
    categoryScores();
    displayTotal1();
    displayTotal2();
    hasSubmit = true;
    selectedArray = [];
    resetSelections();
    resetOptions();
    howManyRolls = 1;
  }

  const blockResubmit = ()=>{
    if (firstSubmit == true) {
      submitValues();
      firstSubmit = false;
    } else {
      alert("You can only submit your score once per turn.")
    }
  }

  //adds turn score to total score
  const addToTotal = ()=>{
      currentPlayer.total+=scoreTotal;
  }

  //This "deselects" all of the previously selected values
  const resetSelections = ()=>{
    pickedFirst = false;
    first.css('background-color','white');
    pickedSecond = false;
    second.css('background-color','white');
    pickedThird = false;
    third.css('background-color','white');
    pickedFourth = false;
    fourth.css('background-color','white');
    pickedFifth = false;
    fifth.css('background-color','white');
  }

  //How to reset the choice to 'null' and takes off background color after submitting it
  const resetOptions = ()=>{
    choice = false;
    $('#aces').css('background-color','white');
    $('#twos').css('background-color','white');
    $('#threes').css('background-color','white');
    $('#fours').css('background-color','white');
    $('#fives').css('background-color','white');
    $('#sixes').css('background-color','white');
    $('#chance').css('background-color','white');
    $('#yahtzee').css('background-color','white');
  }

  //This is used in 'switchPlayers' to increase the 'round' when it's supposed to
  const adjustRound = ()=>{
    roundReset+=1;
    if (roundReset >= 2) {
      round+=1;
      roundReset = 0;
      displayRound();
    }
  }

  //In this, the function inserts the appropriate category score on the site
  const categoryScores = ()=>{
    if (currentPlayer == userOneOptions) {
      if (choice == 'aces') {
        $("#userOneAces").text(scoreTotal);
      } else if (choice == 'twos') {
        $('#userOneTwos').text(scoreTotal);
      } else if (choice == 'threes') {
        $('#userOneThrees').text(scoreTotal);
      } else if (choice == 'fours') {
        $('#userOneFours').text(scoreTotal);
      } else if (choice == 'fives') {
        $('#userOneFives').text(scoreTotal);
      } else if (choice == 'sixes') {
        $('#userOneSixes').text(scoreTotal);
      } else if (choice == 'chance') {
        $('#userOneChance').text(scoreTotal);
      } else if (choice == 'yahtzee') {
        $('#userOneYahtzee').text(scoreTotal);
      }
    } else if (currentPlayer == userTwoOptions) {
        if (choice == 'aces') {
          $('#userTwoAces').text(scoreTotal);
        } else if (choice == 'twos') {
          $('#userTwoTwos').text(scoreTotal);
        } else if (choice == 'threes') {
          $('#userTwoThrees').text(scoreTotal);
        } else if (choice == 'fours') {
          $('#userTwoFours').text(scoreTotal);
        } else if (choice == 'fives') {
          $('#userTwoFives').text(scoreTotal);
        } else if (choice == 'sixes') {
          $('#userTwoSixes').text(scoreTotal);
        } else if (choice == 'chance') {
          $('#userTwoChance').text(scoreTotal);
        } else if (choice == 'yahtzee') {
          $('#userTwoYahtzee').text(scoreTotal);
        }
    }
  }

  //Once scores are displayed in the individual objects above, this function will make sure that users cannot add to an object more than once.
  const confirmEmpty = ()=>{
    if (currentPlayer == userOneOptions) {
      if (choice == 'aces') {
        if ($("#userOneAces") != "0") {
          alert("The 'Aces' option has already been used. Please select an unused option.");
        }
      }
    }
  }

  //This is for the "Submit Points" button
  const pointsButton = $('#pointsButton');
  pointsButton.on('click',blockResubmit);

  //These allow the user to choose which option that they want
  const chooseAces = $('#aces')
  chooseAces.on('click', ()=>{
    resetOptions();
    choice = 'aces';
    $('#aces').css('background-color','blue');
  });
  const chooseTwos = $('#twos');
  chooseTwos.on('click', ()=>{
    resetOptions();
    choice = 'twos';
    $('#twos').css('background-color','blue');
  });
  const chooseThrees = $('#threes');
  chooseThrees.on('click', ()=>{
    resetOptions();
    choice = 'threes';
    $('#threes').css('background-color','blue');
  });
  const chooseFours = $('#fours');
  chooseFours.on('click', ()=>{
    resetOptions();
    choice = 'fours';
    $('#fours').css('background-color','blue');
  });
  const chooseFives = $('#fives');
  chooseFives.on('click', ()=>{
    resetOptions();
    choice = 'fives';
    $('#fives').css('background-color','blue');
  });
  const chooseSixes = $('#sixes');
  chooseSixes.on('click', ()=>{
    resetOptions();
    choice = 'sixes'
    $('#sixes').css('background-color','blue');
  });
  const chooseChance = $('#chance');
  chooseChance.on('click', ()=>{
    resetOptions();
    choice = 'chance';
    $('#chance').css('background-color','blue');
  });
  const chooseYahtzee = $('#yahtzee');
  chooseYahtzee.on('click', ()=>{
    resetOptions();
    choice = 'yahtzee';
    $('#yahtzee').css('background-color','blue');
  });

  //This function (which is inserted the above 'submitValues' function) confirms that the the values submitted meet all of the requirements.
  const checkValues = ()=>{
    if (choice == 'aces'){
      for (let i = 0; i < selectedArray.length; i++){
        if (selectedArray[i] != 1) {
          alert("The chosen dice do not work for the option that you have selected.");
          selectedArray = [];
        }
      }
    } else if (choice == 'twos'){
      for (let i = 0; i < selectedArray.length; i++){
        if (selectedArray[i] != 2) {
          alert("The chosen dice do not work for the option that you have selected.")
          selectedArray = []
        }
      }
    } else if (choice == 'threes'){
      for (let i = 0; i < selectedArray.length; i++){
        if (selectedArray[i] != 3) {
          alert("The chosen dice do not work for the option that you have selected.")
          selectedArray = []
        }
      }
    } else if (choice == 'fours'){
      for (let i = 0; i < selectedArray.length; i++){
        if (selectedArray[i] != 4) {
          alert("The chosen dice do not work for the option that you have selected.")
          selectedArray = []
        }
      }
    } else if (choice == 'fives'){
      for (let i = 0; i < selectedArray.length; i++){
        if (selectedArray[i] != 5) {
          alert("The chosen dice do not work for the option that you have selected.")
          selectedArray = []
        }
      }
    } else if (choice == 'sixes'){
      for (let i = 0; i < selectedArray.length; i++){
        if (selectedArray[i] != 6) {
          alert("The chosen dice do not work for the option that you have selected.")
          selectedArray = []
        }
      }
    } else if (choice == 'chance'){
      for (let i = 0; i < selectedArray.length; i++){
        if (selectedArray.length < 5) {
          alert("Select all die when using the 'Chance' option.")
          selectedArray = []
        }
      }
    } else if (choice == 'yahtzee'){
      for (let i = 0; i < selectedArray.length; i++){
        if (selectedArray.length < 5) {
          alert("Select all die when using the 'Chance' option.");
          selectedArray = [];
        }
      const testItem = selectedArray[0];
      for (let i = 1; i < selectedArray.length; i++) {
        if (testItem != selectedArray[i]) {
          alert("All die must be equal when using the 'Yahtzee' option.")
          selectedArray = [];
        }
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

})
