/*************************************** 
Query Selectors
****************************************/
// selectors for main app elements
let getWeightInpt = document.querySelector('#getWeight');
let calculatePlatesBtn = document.querySelector('#calculatePlates');
let displayPlates = document.querySelector('#displayPlates');
let resultsTextDesc = document.querySelector('#resultsTextDesc');
let listHistory = document.querySelector('#listHistory');
// Toggle btn to switch dark/light mode
let darkModeToggle = document.querySelector('#myonoffswitch');
// Toggle btns for History & Warmup containers
let toggleDisplayBtn = document.querySelectorAll('.toggleDisplayBtn');
let historyToggleBtn = document.querySelector('#historyToggleBtn');
let warmUpToggleBtn = document.querySelector('#warmUpToggleBtn');
// History & Warmup containers
let historyContainer = document.querySelector('#historyContainer');
let warmUpContainer = document.querySelector('#warmUpContainer');
let listWarmUpReps = document.querySelector('#listWarmUpReps');

/*************************************** 
Event Listeners
****************************************/

// ********** on 'click' on calculatePlatesBtn - get user Inputed Weight from input
calculatePlatesBtn.addEventListener('click', () => {
  // create variable userWeightInput that saves the value from the input
  let userWeightInput = getWeightInpt.value;
  // reset text result area and warmup list container
  resultsTextDesc.innerHTML = '';
  listWarmUpReps.innerHTML = '';

  // Tests to see if input and calculation function work,
  //  see ---- calcPlates() ---- in functions section below
  console.log(userWeightInput);
  console.log(calcPlates(userWeightInput));

  // Conditional: if weight is less than 45, return 'incorrect input' since the bar weights 45
  if (userWeightInput < 45) {
    resultsTextDesc.innerHTML = 'Incorrect Input';
  } else {
    // Inputs the string of the plates calculation to the results area
    resultsTextDesc.innerHTML = calcPlates(userWeightInput).toString();

    // Inputs user entered weight into the history container,
    // see ---- addToHistory() ---- in functions section below
    addToHistory(userWeightInput);

    // Inputs user entered weight, calculates warm up weights and adds to Warm Up container,
    // see ---- calcWarmUp() ---- in functions section below
    calcWarmUp(userWeightInput);
  }
});

// ********** on 'click' on darkModeToggle -- change dark to light mode
darkModeToggle.addEventListener('click', () => {
  // toggles darkModeToggle css class to body
  let bodyElem = document.body;
  bodyElem.classList.toggle('darkModeToggle');
});

// ********** on 'click' on either historyToggleBtn or warmUpToggleBtn -- swap toggle containers
historyToggleBtn.addEventListener('click', () => {
  // Toggle between history & warmUp Button
  historyToggleBtn.classList.toggle('active');
  warmUpToggleBtn.classList.toggle('active');

  // Toggle between history & warmUp Containers
  historyContainer.classList.toggle('hidden');
  warmUpContainer.classList.toggle('hidden');
});

warmUpToggleBtn.addEventListener('click', () => {
  // Toggle back between warmUp & history Button
  warmUpToggleBtn.classList.toggle('active');
  historyToggleBtn.classList.toggle('active');

  // Toggle back between warmUp & history Containers
  warmUpContainer.classList.toggle('hidden');
  historyContainer.classList.toggle('hidden');
});

/*************************************** 
Functions
****************************************/

// -------- calcPlates() -------- Calculates the plate weight on each side of the barbell
function calcPlates(
  // Setting default parameters
  totalWeight = 45, // entered weight to calculate
  barWeight = 45, // standard bar weight is 45 lbs
  availablePlates = [1.25, 2.5, 5, 10, 25, 35, 45] // plates at my gym
) {
  // Declaring variables
  let result = [], // stores an array of plates required
    plates = availablePlates.sort((a, b) => b - a).slice(), //takes the availablePlates, sorts and saves as new arr
    load = (totalWeight - barWeight) / 2; //calculates weight minus the bar weight

  // Conditional - catches errors if the bar is heavier than the weight entered
  if (load < 0) {
    return [null];
  }
  // loops through plates - each times subtracts plate weight from load and addes plate to result
  for (let plate of plates) {
    while (plate <= load) {
      // subtracts available plates from load
      load -= plate;
      // plate is pushed to the result if it works
      result.push(plate);
    }
  }
  return result;
}

// -------- addToHistory() -------- Inputs user entered weight into the history ul list as li
function addToHistory(historyInput) {
  // Inputs user entered weight into the history ul list as li
  let weightHistoryEntry = document.createElement('li');
  weightHistoryEntry.innerHTML = historyInput;
  listHistory.appendChild(weightHistoryEntry);
}

// -------- calcWarmUp() -------- Calculates warmup reps required
function calcWarmUp(totalWeight, barWeight = 45) {
  let warmUpOne = barWeight;
  let warmUpTwo = Math.floor((totalWeight * 0.45) / 5) * 5;
  let warmUpThree = Math.floor((totalWeight * 0.65) / 5) * 5;
  let warmUpFour = Math.floor((totalWeight * 0.85) / 5) * 5;
  let arrWarmUp = [warmUpOne, warmUpTwo, warmUpThree, warmUpFour];
  let arrWarmUpReps = [5, 5, 3, 2];
  let arrWarmUpPlates = [
    calcPlates(warmUpOne),
    calcPlates(warmUpTwo),
    calcPlates(warmUpThree),
    calcPlates(warmUpFour),
  ];

  arrWarmUp.forEach((elem, ind) => {
    let warmUpWeightEntry = document.createElement('li');
    warmUpWeightEntry.innerHTML = `<b>${elem} lb</b> (${arrWarmUpPlates[ind]}) x <b>${arrWarmUpReps[ind]} reps</b>`;
    listWarmUpReps.appendChild(warmUpWeightEntry);
  });
}
