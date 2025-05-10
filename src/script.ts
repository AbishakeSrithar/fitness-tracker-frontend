
// type JSONValue =
//     | string
//     | number
//     | boolean
//     | { [x: string]: JSONValue }
//     | Array<JSONValue>;

enum DateTypes {
  Workout,
  Entry,
  Exercise
}

interface Entry {
  id: number;
  workoutId: number;
  exerciseId: number;
  weight: number;
  sets: number;
  reps: number;
}

interface Exercise {
  id: number;
  name: string;
  description: string;
}

interface Workout {
  id: number;
  name: string;
  date: Date;
}



document.getElementById("getAllEntriesButton").onclick = getAllEntries
document.getElementById("getAllExercisesButton").onclick = getAllExercises
document.getElementById("getAllWorkoutsButton").onclick = getAllWorkouts

function getAllEntries() {
  fetch("http://localhost:8080/api/entry/get")
  .then(async function(response) {
    let payload = await response.json();
    let entry = payload.payload as Array<Entry>;
    return entry;
  }).then(function(entry) {
  generateTable(entry, DateTypes.Entry)
  });
}

function getAllExercises() {
  fetch("http://localhost:8080/api/exercise/get")
  .then(async function(response) {
    let payload = await response.json();
    let exercise = payload.payload as Array<Exercise>;
    return exercise;
  }).then(function(data) {
    generateTable(data, DateTypes.Exercise)
  });
}

function getAllWorkouts() {
  fetch("http://localhost:8080/api/workout/get")
  .then(async function(response) {
    let payload = await response.json();
    let entry = payload.payload as Array<Entry>;
    return entry;
  }).then(function(data) {
    generateTable(data, DateTypes.Workout)
  });
}

function generateTable(data: Entry[] | Exercise[] | Workout[], dataType: DateTypes) {
  const prevTable = document.querySelector("table")
  if (prevTable) {
    prevTable.remove()
  }
  const tbl = document.createElement("table");
  const tblBody = document.createElement("tbody");

  console.log(Array.isArray(data))

  if (Array.isArray(data)) {
    for (let i = 0; i < data.length; i++) {
      const row = generateRow(data[i], dataType)
  
      // add the row to the end of the table body
      tblBody.appendChild(row);
    }
  } 
  else {
    const row = generateRow(data, dataType)
    tblBody.appendChild(row);
  }

  // put the <tbody> in the <table>
  tbl.appendChild(tblBody);
  // appends <table> into <body>
  document.body.appendChild(tbl);
  // sets the border attribute of tbl to '2'
  tbl.setAttribute("border", "2");
}

function generateRow(input: Entry | Workout | Exercise, dataType: DateTypes) {

  switch (dataType) {
    case DateTypes.Workout:
      return generateWorkoutRow(input as Workout)
    case DateTypes.Exercise:
      return generateExerciseRow(input as Exercise)
    case DateTypes.Entry:
      return generateEntryRow(input as Entry)
  }
}

function generateExerciseRow(input: Exercise) {
  const row = document.createElement("tr");

  const cell1 = document.createElement("td");
  const cell1Text = document.createTextNode(`id: ${input.id}`);
  cell1.appendChild(cell1Text);
  row.appendChild(cell1);


  const cell2 = document.createElement("td");
  const cell2Text = document.createTextNode(`name: ${input.name}`);
  cell2.appendChild(cell2Text);
  row.appendChild(cell2);


  const cell3 = document.createElement("td");
  const cell3Text = document.createTextNode(`description: ${input.description}`);
  cell3.appendChild(cell3Text);
  row.appendChild(cell3);

  return row
}

function generateWorkoutRow(input: Workout) {
  const row = document.createElement("tr");

  const cell1 = document.createElement("td");
  const cell1Text = document.createTextNode(`id: ${input.id}`);
  cell1.appendChild(cell1Text);
  row.appendChild(cell1);


  const cell2 = document.createElement("td");
  const cell2Text = document.createTextNode(`name: ${input.name}`);
  cell2.appendChild(cell2Text);
  row.appendChild(cell2);


  const cell3 = document.createElement("td");
  const cell3Text = document.createTextNode(`date: ${input.date}`);
  cell3.appendChild(cell3Text);
  row.appendChild(cell3);

  return row
}

function generateEntryRow(input: Entry) {
  const row = document.createElement("tr");

  const cell1 = document.createElement("td");
  const cell1Text = document.createTextNode(`id: ${input.id}`);
  cell1.appendChild(cell1Text);
  row.appendChild(cell1);


  const cell2 = document.createElement("td");
  const cell2Text = document.createTextNode(`workoutId: ${input.workoutId}`);
  cell2.appendChild(cell2Text);
  row.appendChild(cell2);


  const cell3 = document.createElement("td");
  const cell3Text = document.createTextNode(`exerciseId: ${input.exerciseId}`);
  cell3.appendChild(cell3Text);
  row.appendChild(cell3);


  const cell4 = document.createElement("td");
  const cell4Text = document.createTextNode(`weight: ${input.weight}`);
  cell4.appendChild(cell4Text);
  row.appendChild(cell4);


  const cell5 = document.createElement("td");
  const cell5Text = document.createTextNode(`sets: ${input.sets}`);
  cell5.appendChild(cell5Text);
  row.appendChild(cell5);


  const cell6 = document.createElement("td");
  const cell6Text = document.createTextNode(`reps: ${input.reps}`);
  cell6.appendChild(cell6Text);
  row.appendChild(cell6);


  return row
}


