import "./style.css";
import { getAllEntries } from "./core/entry/getAllEntries";
import { getAllExercises } from "./core/exercise/getAllExercises";
import { getAllWorkouts } from "./core/workout/getAllWorkouts";

import { addEventListenerForEntryById } from "./core/entry/getEntryById";
import { addEventListenerForExerciseById } from "./core/exercise/getExerciseById";
import { addEventListenerForWorkoutById } from "./core/workout/getWorkoutById";

// Get All
document.getElementById("getAllEntriesButton")!.onclick = getAllEntries;
document.getElementById("getAllExercisesButton")!.onclick = getAllExercises;
document.getElementById("getAllWorkoutsButton")!.onclick = getAllWorkouts;

// Get By Id
addEventListenerForEntryById()
addEventListenerForExerciseById()
addEventListenerForWorkoutById()