import "./style.css";
import { getAllEntries } from "./core/entry/read/getAllEntries";
import { getAllExercises } from "./core/exercise/read/getAllExercises";
import { getAllWorkouts } from "./core/workout/read/getAllWorkouts";

import { addEventListenerForGetEntryById } from "./core/entry/read/getEntryById";
import { addEventListenerForGetExerciseById } from "./core/exercise/read/getExerciseById";
import { addEventListenerForGetWorkoutById } from "./core/workout/read/getWorkoutById";

import { addEventListenerForGetWorkoutsByName } from "./core/workout/read/getWorkoutsByName";
import { addEventListenerForGetWorkoutsByDate } from "./core/workout/read/getWorkoutsByDate";
import { addEventListenerForGetExerciseByName } from "./core/exercise/read/getExercisesByName";
import { addEventListenerForGetEntryByWorkoutId } from "./core/entry/read/getEntryByWorkoutId";
import { addEventListenerForGetEntryByExerciseId } from "./core/entry/read/getEntryByExerciseId";

// Create
import { addEventListenerForCreateEntry } from "./core/entry/create/createEntry";
import { addEventListenerForCreateWorkout } from "./core/workout/create/createWorkout";
import { addEventListenerForCreateExercise } from "./core/exercise/create/createExercise";

// Update
import { addEventListenerForUpdateEntry } from "./core/entry/update/updateEntry";
import { addEventListenerForUpdateExercise } from "./core/exercise/update/updateExercise";
import { addEventListenerForUpdateWorkout } from "./core/workout/update/updateWorkout";

// Delete
import { addEventListenerForDeleteExercise } from "./core/exercise/delete/deleteExercise";
import { addEventListenerForDeleteEntry } from "./core/entry/delete/deleteEntry";
import { addEventListenerForDeleteWorkout } from "./core/workout/delete/deleteWorkout";

// Import CSV
import { importCSV } from "./core/importCSV";
import { addEventListenerForGraphExercise } from "./core/exercise/read/graphExercise";
import { collapseTable } from "./utilities/tableUtility";
import { getAllWorkoutsAndGraph } from "./core/workout/read/graphWorkouts";

var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function(this: any) {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
} 

getAllWorkoutsAndGraph()

// Quick Tools
document.getElementById("importButton")!.onclick = importCSV;
document.getElementById("collapseTables")!.onclick = collapseTable;
addEventListenerForGraphExercise();

// Get All
document.getElementById("getAllEntriesButton")!.onclick = getAllEntries;
document.getElementById("getAllExercisesButton")!.onclick = getAllExercises;
document.getElementById("getAllWorkoutsButton")!.onclick = getAllWorkouts;

// Get By Id
addEventListenerForGetEntryById();

// Workout Get By
addEventListenerForGetWorkoutById();
addEventListenerForGetWorkoutsByName();
addEventListenerForGetWorkoutsByDate();

// Exercise Get By
addEventListenerForGetExerciseById();
addEventListenerForGetExerciseByName();
addEventListenerForGetEntryByWorkoutId();
addEventListenerForGetEntryByExerciseId();

// Create
addEventListenerForCreateEntry();
addEventListenerForCreateWorkout();
addEventListenerForCreateExercise();

// Update
addEventListenerForUpdateEntry();
addEventListenerForUpdateExercise();
addEventListenerForUpdateWorkout();

// Delete
addEventListenerForDeleteExercise();
addEventListenerForDeleteEntry();
addEventListenerForDeleteWorkout();


