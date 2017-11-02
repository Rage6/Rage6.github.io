$(()=>{
  // testing event_points branch

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
  let acesBlank = false;
  let twosBlank = false;
  let threesBlank = false;
  let foursBlank = false;
  let fivesBlank = false;
  let sixesBlank = false;
  let chanceBlank = false;
  let yahtzeeBlank = false;
  let noAdd = null;
  let checkedArray = [];
  let endOfTurn = false;

  const userOneOptions = {
    'name': user1,
    'aces': 0,
    'acesBlank': false,
    'twos': 0,
    'threes': 0,
    'fours': 0,
    'fives': 0,
    'sixes': 0,
    'chance': 0,
    'yahtzee': 0
  }

  let userOneTotal = 0;

  const userTwoOptions = {
    'name': user2,
    'aces': 0,
    'acesBlank': false,
    'twos': 0,
    'threes': 0,
    'fours': 0,
    'fives': 0,
    'sixes': 0,
    'chance': 0,
    'yahtzee': 0,
    'total': 0
  }

  let userTwoTotal = 0;

  //All of these have to follow the two user objects
  //Display the names on the website
  $('#name1').text(userOneOptions.name);
  $('#name2').text(userTwoOptions.name);
  //This sets the first player
  let currentPlayer = userOneOptions;
  //These display the total of each player's total. The functions are used again in 'submitValues' in order to update the total
  const displayTotal1 = ()=>{
    console.log("displayTotal1 activated");
    $('#total1').text(userOneTotal);
  }
  const displayTotal2 = ()=>{
    console.log("displayTotal2 activated");
    $('#total2').text(userTwoTotal);
  }
  const displayRound = ()=>{
    console.log("displayRound activated");
    $('#round').text(round);
  }
  displayTotal1();
  displayTotal2();
  displayRound();

  //This is how to switch between the users' objects.
  const switchPlayers = ()=>{
    console.log("switchPlayers activated");
    if (round <= 8) {
      if (hasSubmit == true) {
        if (toSwitchPlayer == true) {
          currentPlayer = userOneOptions;
          $('#name1').css('background-color','orange');
          $('#name2').css('background-color','ivory');
          howManyRolls = 1;
          toSwitchPlayer = false;
          hasSubmit = false;
          endOfTurn = false;
        } else {
          currentPlayer = userTwoOptions;
          $('#name2').css('background-color','orange');
          $('#name1').css('background-color','ivory');
          howManyRolls = 1;
          toSwitchPlayer = true;
          hasSubmit = false;
          endOfTurn = false;
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
        alert("Sorry, but the current player must submit their points before the next turn can begin.");
        firstSubmit = true;
      }
    } else {
      findWinnerName();
    }
  }

  //Use this to determine the name of the winner.
  const findWinnerName = ()=>{
    console.log("findWinnerName activated");
    if (userOneTotal > userTwoOptions.total) {
      alert('Congratulations, '+userOneOptions.name+'! You successfully defeated '+userTwoOptions.name+'. Cheers!');
    } else if (userOneTotal < userTwoOptions.total) {
      alert('Congratulations, '+userTwoOptions.name+'! You successfully defeated '+userOneOptions.name+'. Well done!')
    } else {
      alert("You two tied?! That's amazing! You must each be equally good!")
    }
  }

  //This simply attaches switchPlayers to the 'Next Turn' button
  const nextTurn = $('#startButton');
  nextTurn.on('click',switchPlayers);

  //This generates an integer between 1 and 6
  const rollDice = ()=>{
    console.log("rollDice activated");
    min = Math.ceil(1);
    max = Math.floor(7);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  //This will randomly assign a number, between 1 and 6, to the dice 'diceNum'
  const makeNum = (diceNum)=>{
    console.log("makeNum activated");
    const check = rollDice().toString()
    diceNum.text(check);
  }

  //The following 5 groups can make a dice go grey and assign it a boolean
  const first = $('#first')
  first.on('click',()=>{
    console.log("first activated");
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
    console.log("second activated");
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
    console.log("third activated");
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
    console.log("fourth activated");
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
    console.log("fifth activated");
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
    console.log("shuffleAllDice activated");
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
    console.log("submitValue activated")
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
  }

  const blockResubmit = ()=>{
    console.log("blockResubmit activated")
    if (firstSubmit == true || endOfTurn == false) {
      // I used to have 'submitValues()' here, but that's what kept causing it to block valid submits after
      firstSubmit = false;
      submitValues();
    } else {
      alert("You can only submit your score once per turn.")
    }
  }

  //adds turn score to total score
  const addToTotal = ()=>{
    console.log("addToTotal activated");
    if (choice == 'yahtzee' && selectedArray.length == 5) {
      currentPlayer.total += 50;
    } else if (noAdd != true){
      currentPlayer.total+=scoreTotal;
    }
  }

  //This "deselects" all of the previously selected values
  const resetSelections = ()=>{
    console.log("resetSelections activated");
    pickedFirst = false;
    first.css('background-color','ivory');
    pickedSecond = false;
    second.css('background-color','ivory');
    pickedThird = false;
    third.css('background-color','ivory');
    pickedFourth = false;
    fourth.css('background-color','ivory');
    pickedFifth = false;
    fifth.css('background-color','ivory');
  }

  //How to reset the choice to 'null' and takes off background color after submitting it
  const resetOptions = ()=>{
    console.log("resetOptions activities");
    choice = false;
    $('#aces').css('background-color','ivory');
    $('#twos').css('background-color','ivory');
    $('#threes').css('background-color','ivory');
    $('#fours').css('background-color','ivory');
    $('#fives').css('background-color','ivory');
    $('#sixes').css('background-color','ivory');
    $('#chance').css('background-color','ivory');
    $('#yahtzee').css('background-color','ivory');
  }

  //This is used in 'switchPlayers' to increase the 'round' when it's supposed to
  const adjustRound = ()=>{
    console.log("adjustRound activated")
    roundReset+=1;
    if (roundReset >= 2) {
      round+=1;
      roundReset = 0;
      displayRound();
    }
  }

  //In this, the function inserts the appropriate category score on the site
  const categoryScores = ()=>{
    console.log("categoryScores activated");
    if (currentPlayer == userOneOptions) {
      if (choice == 'aces') {
        userOneOptions.aces = scoreTotal;
        userOneTotal += scoreTotal;
        $("#userOneAces").text(scoreTotal).css('color','red');
      } else if (choice == 'twos') {
        userOneOptions.twos = scoreTotal;
        userOneTotal += scoreTotal;
        $('#userOneTwos').text(scoreTotal).css('color','red');
      } else if (choice == 'threes') {
        userOneOptions.threes = scoreTotal;
        userOneTotal += scoreTotal;
        $('#userOneThrees').text(scoreTotal).css('color','red');
      } else if (choice == 'fours') {
        userOneOptions.fours = scoreTotal;
        userOneTotal += scoreTotal;
        $('#userOneFours').text(scoreTotal).css('color','red');
      } else if (choice == 'fives') {
        userOneOptions.fives = scoreTotal;
        userOneTotal += scoreTotal;
        $('#userOneFives').text(scoreTotal).css('color','red');
      } else if (choice == 'sixes') {
        userOneOptions.sixes = scoreTotal;
        userOneTotal += scoreTotal;
        $('#userOneSixes').text(scoreTotal).css('color','red');
      } else if (choice == 'chance') {
        userOneOptions.chance = scoreTotal;
        userOneTotal += scoreTotal;
        $('#userOneChance').text(scoreTotal).css('color','red');
      } else if (choice == 'yahtzee') {
        userOneOptions.yahtzee = scoreTotal;
        userOneTotal += scoreTotal;
        $('#userOneYahtzee').text(scoreTotal).css('color','red');
      }
    } else if (currentPlayer == userTwoOptions) {
        if (choice == 'aces') {
          userTwoOptions.aces = scoreTotal;
          userTwoTotal += scoreTotal;
          $('#userTwoAces').text(scoreTotal).css('color','red');
        } else if (choice == 'twos') {
          userTwoOptions.twos = scoreTotal;
          userTwoTotal += scoreTotal;
          $('#userTwoTwos').text(scoreTotal).css('color','red');
        } else if (choice == 'threes') {
          userTwoOptions.threes = scoreTotal;
          userTwoTotal += scoreTotal;
          $('#userTwoThrees').text(scoreTotal).css('color','red');
        } else if (choice == 'fours') {
          userTwoOptions.fours = scoreTotal;
          userTwoTotal += scoreTotal;
          $('#userTwoFours').text(scoreTotal).css('color','red');
        } else if (choice == 'fives') {
          userTwoOptions.fives = scoreTotal;
          userTwoTotal += scoreTotal;
          $('#userTwoFives').text(scoreTotal).css('color','red');
        } else if (choice == 'sixes') {
          userTwoOptions.sixes = scoreTotal;
          userTwoTotal += scoreTotal;
          $('#userTwoSixes').text(scoreTotal).css('color','red');
        } else if (choice == 'chance') {
          userTwoOptions.chance = scoreTotal;
          userTwoTotal += scoreTotal;
          $('#userTwoChance').text(scoreTotal).css('color','red');
        } else if (choice == 'yahtzee') {
          userTwoOptions.yahtzee = scoreTotal;
          userTwoTotal += scoreTotal;
          $('#userTwoYahtzee').text(scoreTotal).css('color','red');
        }
    }
  }

  //Once scores are displayed in the individual objects above, this function will make sure that users cannot add to an object more than once.
  const confirmEmpty = ()=>{
    console.log("confirmEmpty activated");
    if (currentPlayer == userOneOptions) {
      console.log("Player 1 options are in use.");
      if (choice == 'aces') {
        if (userOneOptions.aces != 0 || userOneOptions.acesBlank == true) {
          noAdd = true;
          alert("The 'Aces' option has already been used. Please select an unused option.");
          firstSubmit = true;
        }
      } else if (choice == 'twos') {
        if (userOneOptions.twos != 0 || twosBlank == true) {
          noAdd = true;
          alert("The 'Twos' option has already been used. Please select an unused option.");
          firstSubmit = true;
        }
      } else if (choice == 'threes') {
        if (userOneOptions.threes != 0 || threesBlank == true) {
          noAdd = true;
          alert("The 'Threes' option has already been used. Please select an unused option.");
          firstSubmit = true;
        }
      } else if (choice == 'fours') {
        if (userOneOptions.fours != 0 || foursBlank == true) {
          noAdd = true;
          alert("The 'Fours' option has already been used. Please select an unused option.");
          firstSubmit = true;
        }
      } else if (choice == 'fives') {
        if (userOneOptions.fives != 0 || fivesBlank == true) {
          noAdd = true;
          alert("The 'Fives' option has already been used. Please select an unused option.");
          firstSubmit = true;
        }
      } else if (choice == 'sixes') {
        if (userOneOptions.sixes != 0 || sixesBlank == true) {
          noAdd = true;
          alert("The 'Sixes' option has already been used. Please select an unused option.");
          firstSubmit = true;
        }
      } else if (choice == 'chance') {
        if (userOneOptions.chance != 0 || chanceBlank == true) {
          noAdd = true;
          alert("The 'Chance' option has already been used. Please select an unused option.");
          firstSubmit = true;
        }
      } else if (choice == 'yahtzee') {
        if (userOneOptions.yahtzee != 0 || yahtzeeBlank == true) {
          noAdd = true;
          alert("The 'Yahtzee' option has already been used. Please select an unused option.");
          firstSubmit = true;
        }
      } else {
        noAdd = false;
      }
    } else if (currentPlayer == userTwoOptions) {
      console.log("Player 2 options are in use.");
        if (choice == 'aces') {
          if (userTwoOptions.aces != 0 || userTwoOptions.acesBlank == true) {
            noAdd = true;
            alert("The 'Aces' option has already been used. Please select an unused option.");
            firstSubmit = true;
          }
        } else if (choice == 'twos') {
          if (userTwoOptions.twos != 0 || twosBlank == true) {
            noAdd = true;
            alert("The 'Twos' option has already been used. Please select an unused option.");
            firstSubmit = true;
          }
        } else if (choice == 'threes') {
          if (userTwoOptions.threes != 0 || threesBlank == true) {
            noAdd = true;
            alert("The 'Threes' option has already been used. Please select an unused option.");
            firstSubmit = true;
          }
        } else if (choice == 'fours') {
          if (userTwoOptions.fours != 0 || foursBlank == true) {
            noAdd = true;
            alert("The 'Fours' option has already been used. Please select an unused option.");
            firstSubmit = true;
          }
        } else if (choice == 'fives') {
          if (userTwoOptions.fives != 0 || fivesBlank == true) {
            noAdd = true;
            alert("The 'Fives' option has already been used. Please select an unused option.");
            firstSubmit = true;
          }
        } else if (choice == 'sixes') {
          if (userTwoOptions.sixes != 0 || sixesBlank == true) {
            noAdd = true;
            alert("The 'Sixes' option has already been used. Please select an unused option.");
            firstSubmit = true;
          }
        } else if (choice == 'chance') {
          if (userTwoOptions.chance != 0 || chanceBlank == true) {
            noAdd = true;
            alert("The 'Chance' option has already been used. Please select an unused option.");
            firstSubmit = true;
          }
        } else if (choice == 'yahtzee') {
          if (userTwoOptions.yahtzee != 0 || yahtzeeBlank == true) {
            noAdd = true;
            alert("The 'Yahtzee' option has already been used. Please select an unused option.");
            firstSubmit = true;
          }
        } else {
          noAdd = false;
        }
      }
      // The end of userTwoOptions addition
      else {
      console.log("Error occurred within confirmEmpty()")
    }
  }

  //This is for the "Enter Points" button
  const pointsButton = $('#pointsButton');
  pointsButton.on('click',blockResubmit);

  //These allow the user to choose which option that they want
  const chooseAces = $('#aces')
  chooseAces.on('click', ()=>{
    console.log("Aces chosen.")
    resetOptions();
    choice = 'aces';
    $('#aces').css('background-color','grey');
  });
  const chooseTwos = $('#twos');
  chooseTwos.on('click', ()=>{
    console.log("Twos chosen.")
    resetOptions();
    choice = 'twos';
    $('#twos').css('background-color','grey');
  });
  const chooseThrees = $('#threes');
  chooseThrees.on('click', ()=>{
    console.log("Threes chosen.")
    resetOptions();
    choice = 'threes';
    $('#threes').css('background-color','grey');
  });
  const chooseFours = $('#fours');
  chooseFours.on('click', ()=>{
    console.log("Fours chosen.")
    resetOptions();
    choice = 'fours';
    $('#fours').css('background-color','grey');
  });
  const chooseFives = $('#fives');
  chooseFives.on('click', ()=>{
    console.log("Fives chosen.")
    resetOptions();
    choice = 'fives';
    $('#fives').css('background-color','grey');
  });
  const chooseSixes = $('#sixes');
  chooseSixes.on('click', ()=>{
    console.log("Sixes chosen.")
    resetOptions();
    choice = 'sixes'
    $('#sixes').css('background-color','grey');
  });
  const chooseChance = $('#chance');
  chooseChance.on('click', ()=>{
    console.log("Chances chosen.")
    resetOptions();
    choice = 'chance';
    $('#chance').css('background-color','grey');
  });
  const chooseYahtzee = $('#yahtzee');
  chooseYahtzee.on('click', ()=>{
    console.log("Yahtzee chosen.")
    resetOptions();
    choice = 'yahtzee';
    $('#yahtzee').css('background-color','grey');
  });

  //After meeting all the criteria, the collection of following functions in 'addAndReset' will add the appropriates points to the category and reset all of the variables for the next turn
  const addAndReset = ()=> {
    console.log("addAndReset activated")
    turnTotal();
    addToTotal();
    categoryScores();
    hasSubmit = true;
    displayTotal1();
    displayTotal2();
    firstSubmit = false;
    selectedArray = [];
    resetSelections();
    resetOptions();
    howManyRolls = 1;
    endOfTurn = true;
    checkedArray = [];
  }

  const addAndResetForLoop = ()=>{
    console.log("addAndResetForLoop activated.");
    turnTotal();
    addToTotal();
    categoryScores();
    hasSubmit = true;
    displayTotal1();
    displayTotal2();
    firstSubmit = false;
    resetSelections();
    resetOptions();
    howManyRolls = 1;
    endOfTurn = true;
  }

  //This function (which is inserted the above 'submitValues' function) confirms that the the values submitted meet all of the requirements.
  const checkValues = ()=>{
    console.log("checkValues activated.");
    if (choice == 'aces') {
      console.log("--- Comparing to Aces.");
      console.log("selectedArray: " + selectedArray);
      if (selectedArray.length == 0) {
        console.log("--- selectedArray is empty");
        console.log("Player: " + currentPlayer.name)
        currentPlayer.acesBlank = true;
        console.log("acesBlank: " + currentPlayer.acesBlank);
        addAndReset();
      } else {
        console.log("--- selectedArray is " + selectedArray);
        for (let i = 0; i < selectedArray.length; i++){
          if (selectedArray[i] != 1) {
            console.log("--- (if) in (for): " + selectedArray[i]);
            alert(selectedArray[i] + " is not an Ace.");
            checkedArray = [];
            firstSubmit = true;
            resetSelections();
            resetOptions();
          } else {
            console.log("--- (else) in for: " + selectedArray[i]);
            checkedArray.push(selectedArray[i]);
          }
        };
        if (checkedArray.length == selectedArray.length) {
          console.log("...and the checkedArray did equal the selectedArray");
          addAndReset();
        } else {
          console.log('...and the checkedArray did NOT equal the selectedArray.');
          selectedArray = [];
          checkedArray = [];
          firstSubmit = true;
          resetSelections();
          resetOptions();
        }
      }
    } else if (choice == 'twos'){
      console.log('Comparing to Twos.');
      if (selectedArray.length == 0) {
        twosBlank = true;
        addAndReset();
      } else {
        for (let i = 0; i < selectedArray.length; i++){
          if (selectedArray[i] != 2) {
            alert(selectedArray[i] + " is not a Two.");
            checkedArray = [];
            firstSubmit = true;
            resetSelections();
            resetOptions();
          } else {
            checkedArray.push(selectedArray[i]);
          }
        };
        if (checkedArray.length == selectedArray.length) {
          addAndReset();
        } else {
          selectedArray = [];
          checkedArray = [];
          firstSubmit = true;
          resetSelections();
          resetOptions();
        }
      }
    } else if (choice == 'threes'){
      console.log('Comparing to Threes.');
      if (selectedArray.length == 0) {
        threesBlank = true;
        addAndReset();
      } else {
        for (let i = 0; i < selectedArray.length; i++){
          if (selectedArray[i] != 3) {
            alert(selectedArray[i] + " is not a Three.");
            checkedArray = [];
            firstSubmit = true;
            resetSelections();
            resetOptions();
          } else {
            checkedArray.push(selectedArray[i]);
          }
        };
        if (checkedArray.length == selectedArray.length) {
          addAndReset();
        } else {
          selectedArray = [];
          checkedArray = [];
          firstSubmit = true;
          resetSelections();
          resetOptions();
        }
      }
    } else if (choice == 'fours'){
      console.log('Comparing to Fours.');
      if (selectedArray.length == 0) {
        foursBlank = true;
        addAndReset();
      } else {
        for (let i = 0; i < selectedArray.length; i++){
          if (selectedArray[i] != 4) {
            alert(selectedArray[i] + " is not a Four.");
            checkedArray = [];
            firstSubmit = true;
            resetSelections();
            resetOptions();
          } else {
            checkedArray.push(selectedArray[i]);
          }
        };
        if (checkedArray.length == selectedArray.length) {
          addAndReset();
        } else {
          selectedArray = [];
          checkedArray = [];
          firstSubmit = true;
          resetSelections();
          resetOptions();
        }
      }
    } else if (choice == 'fives'){
      console.log('Comparing to Fives.');
      if (selectedArray.length == 0) {
        fivesBlank = true;
        addAndReset();
      } else {
        for (let i = 0; i < selectedArray.length; i++){
          if (selectedArray[i] != 5) {
            alert(selectedArray[i] + " is not a Five.");
            checkedArray = [];
            firstSubmit = true;
            resetSelections();
            resetOptions();
          } else {
            checkedArray.push(selectedArray[i]);
          }
        };
        if (checkedArray.length == selectedArray.length) {
          addAndReset();
        } else {
          selectedArray = [];
          checkedArray = [];
          firstSubmit = true;
          resetSelections();
          resetOptions();
        }
      }
    } else if (choice == 'sixes'){
      console.log('Comparing to Sixes.');
      if (selectedArray.length == 0) {
        sixesBlank = true;
        addAndReset();
      } else {
        for (let i = 0; i < selectedArray.length; i++){
          if (selectedArray[i] != 6) {
            alert(selectedArray[i] + " is not a Six.");
            checkedArray = [];
            firstSubmit = true;
            resetSelections();
            resetOptions();
          } else {
            checkedArray.push(selectedArray[i]);
          }
        };
        if (checkedArray.length == selectedArray.length) {
          addAndReset();
        } else {
          selectedArray = [];
          checkedArray = [];
          firstSubmit = true;
          resetSelections();
          resetOptions();
        }
      }
    } else if (choice == 'chance'){
      console.log('Comparing to Chances.');
      if (selectedArray.length == 0) {
        chanceBlank = true;
        addAndReset();
      } else {
        for (let i = 0; i < selectedArray.length; i++){
          if (selectedArray.length < 5) {
            alert("Select all die in order to use the 'Chance' option.")
            selectedArray = [];
            firstSubmit = true;
            resetSelections();
            resetOptions();
          } else {
            addAndReset();
          }
        }
      }
    } else if (choice == 'yahtzee'){
      console.log('Comparing to Yahtzee.');
      // ... if you select no dice
      if (selectedArray.length == 0) {
        console.log("-- no dice entered")
        yahtzeeBlank = true;
        scoreTotal = 0;
        categoryScores();
        displayTotal1();
        displayTotal2();
        firstSubmit = false;
        hasSubmit = true;
        selectedArray = [];
        checkedArray = [];
        resetSelections();
        resetOptions();
        howManyRolls = 1;
      // ... or you have selected at least one die.
      } else {
        // ...if you didn't select all of the dice
        if (selectedArray.length < 5) {
          alert("Select all die when using the 'Yahtzee' option. If your dice do not all the same and you have no more available categories, leave the dice unshaded, select 'Yahtzee', and press 'Enter Points'.");
          selectedArray = [];
          firstSubmit = true;
          resetSelections();
          resetOptions();
        };
        const testItem = selectedArray[0];
        // ...compares the first index to all of the following.
        for (let i = 1; i < 5; i++) {
          // ...if another index is not the same as the first
          if (testItem != selectedArray[i]) {
            alert(selectedArray[i] + " is not the same as rest of the dice.")
            selectedArray = [];
            firstSubmit = true;
            resetSelections();
            resetOptions();
          };
        };
        //... if none of the index were deleted during the loop
        if (selectedArray.length == 5) {
          scoreTotal = 50;
          categoryScores();
          displayTotal1();
          displayTotal2();
          firstSubmit = false;
          hasSubmit = true;
          selectedArray = [];
          checkedArray = [];
          resetSelections();
          resetOptions();
          howManyRolls = 1;
        }
      }
    } else {
      alert('Please select your category.')
      selectedArray = [];
      firstSubmit = true;
      hasSubmit = false;
      resetSelections();
      resetOptions();
    }
  }

  //After the game knows that the user has followed the rules, this function will get the total sum of an array
  const turnTotal = (oneDiePoints)=>{
    console.log("turnTotal activated");
    scoreTotal = 0;
    if (choice == 'yahtzee') {
      scoreTotal = 50;
      console.log("scoreTotal: " + scoreTotal);
    } else {
      for (let i = 0; i < selectedArray.length; i++){
        scoreTotal+=selectedArray[i];
      };
      console.log("scoreTotal: " + scoreTotal);
    }
  }

  //Now we can assign a button to shuffling everything
  const shuffleButton = $('#shuffle');
  shuffleButton.on('click',shuffleAllDice);

  $('#name1').text(user1);
  $('#name2').text(user2);

  $('#reset').on('click',()=>{
    location.reload(true);
  });



})
