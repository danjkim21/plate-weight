// *********** Query Selectors *********** //
let getWeightInpt = document.querySelector('#getWeight');
let calculatePlatesBtn = document.querySelector('#calculatePlates');
let displayPlates = document.querySelector('#displayPlates');
let listHistory = document.querySelector('#listHistory');

// *********** Event Listeners *********** //
// Get user Inputed Weight from input when 'click' on calculatePlatesBtn
calculatePlatesBtn.addEventListener('click', () => {
  // create variable userWeightInput that saves the value from the input
  let userWeightInput = getWeightInpt.value;

  // Tests to see if input and calculation function work,
  //  see ---- calcPlates() ---- function below
  console.log(userWeightInput);
  console.log(calcPlates(userWeightInput));

  // Inputs user entered weight into the history,
  // see ---- addToHistory() ---- function below
  addToHistory(userWeightInput);
});

// *********** Functions *********** //
// ---- calcPlates() ---- Calculates the plate weight on each side of the barbell
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

// ---- addToHistory() ---- Inputs user entered weight into the history ul list as li
function addToHistory(historyInput) {
  // Inputs user entered weight into the history ul list as li
  let weightHistoryEntry = document.createElement('li');
  weightHistoryEntry.innerHTML = historyInput;
  listHistory.appendChild(weightHistoryEntry);
}
