type JSONValue =
    | string
    | number
    | boolean
    | { [x: string]: JSONValue }
    | Array<JSONValue>;

interface Entry {
  id: number;
  workoutId: number;
  exerciseId: number;
  weight: number;
  sets: number;
  reps: number;
}


document.getElementById("getAllEntriesButton").onclick = getAllEntries
// document.getElementById("getAllExercisesButton").onclick = getAllExercises
// document.getElementById("getAllWorkoutsButton").onclick = getAllWorkouts

function getAllEntries() {
  fetch("http://localhost:8080/api/entry/get")
  .then(async function(response) {
    let payload = await response.json();
    let entry = payload.payload as Array<Entry>;
    return entry;
  }).then(function(entry) {
  generateTable(entry, "Entry")
  });
}

// function getAllExercises() {
//   fetch("http://localhost:8080/api/exercise/get")
//   .then(function(response) {
//     return response.json();
//   }).then(function(data) {
//     generateTable(data, "Exercise")
//   });
// }

// function getAllWorkouts() {
//   fetch("http://localhost:8080/api/workout/get")
//   .then(function(response) {
//     return response.json();
//   }).then(function(data) {
//     generateTable(data, "Workout")
//   });
// }

function generateTable(data: Entry[], dataType: string) {
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
  // else {
  //   const row = generateRow(data, dataType)
  //   tblBody.appendChild(row);
  // }

  // put the <tbody> in the <table>
  tbl.appendChild(tblBody);
  // appends <table> into <body>
  document.body.appendChild(tbl);
  // sets the border attribute of tbl to '2'
  tbl.setAttribute("border", "2");
}

function generateRow(entry: Entry, dataType: string) {

  switch (dataType) {
    // case "Workout":
    //   return generateWorkoutRow(entry)
    // case "Exercise":
    //   return generateExerciseRow(entry)
    case "Entry":
      return generateEntryRow(entry)
  }
}

// function generateExerciseRow(payload) {
//   const row = document.createElement("tr");

//   const cell1 = document.createElement("td");
//   const cell1Text = document.createTextNode(`id: ${payload.id}`);
//   cell1.appendChild(cell1Text);
//   row.appendChild(cell1);


//   const cell2 = document.createElement("td");
//   const cell2Text = document.createTextNode(`name: ${payload.name}`);
//   cell2.appendChild(cell2Text);
//   row.appendChild(cell2);


//   const cell3 = document.createElement("td");
//   const cell3Text = document.createTextNode(`description: ${payload.description}`);
//   cell3.appendChild(cell3Text);
//   row.appendChild(cell3);

//   return row
// }

// function generateWorkoutRow(payload) {
//   const row = document.createElement("tr");

//   const cell1 = document.createElement("td");
//   const cell1Text = document.createTextNode(`id: ${payload.id}`);
//   cell1.appendChild(cell1Text);
//   row.appendChild(cell1);


//   const cell2 = document.createElement("td");
//   const cell2Text = document.createTextNode(`name: ${payload.name}`);
//   cell2.appendChild(cell2Text);
//   row.appendChild(cell2);


//   const cell3 = document.createElement("td");
//   const cell3Text = document.createTextNode(`date: ${payload.date}`);
//   cell3.appendChild(cell3Text);
//   row.appendChild(cell3);

//   return row
// }

function generateEntryRow(payload: Entry) {
  const row = document.createElement("tr");

  const cell1 = document.createElement("td");
  const cell1Text = document.createTextNode(`id: ${payload.id}`);
  cell1.appendChild(cell1Text);
  row.appendChild(cell1);


  const cell2 = document.createElement("td");
  const cell2Text = document.createTextNode(`workoutId: ${payload.workoutId}`);
  cell2.appendChild(cell2Text);
  row.appendChild(cell2);


  const cell3 = document.createElement("td");
  const cell3Text = document.createTextNode(`exerciseId: ${payload.exerciseId}`);
  cell3.appendChild(cell3Text);
  row.appendChild(cell3);


  const cell4 = document.createElement("td");
  const cell4Text = document.createTextNode(`weight: ${payload.weight}`);
  cell4.appendChild(cell4Text);
  row.appendChild(cell4);


  const cell5 = document.createElement("td");
  const cell5Text = document.createTextNode(`sets: ${payload.sets}`);
  cell5.appendChild(cell5Text);
  row.appendChild(cell5);


  const cell6 = document.createElement("td");
  const cell6Text = document.createTextNode(`reps: ${payload.reps}`);
  cell6.appendChild(cell6Text);
  row.appendChild(cell6);


  return row
}


