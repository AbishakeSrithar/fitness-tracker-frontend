import "./style.css";
import { getAllEntries } from "./get/all/all-entries";
import { getAllExercises } from "./get/all/all-exercises";
import { getAllWorkouts } from "./get/all/all-workouts";

import { addEventListenerForEntryById } from "./get/byId/getEntryById";
import { addEventListenerForExerciseById } from "./get/byId/getExerciseById";
import { addEventListenerForWorkoutById } from "./get/byId/getWorkoutById";

document.getElementById("getAllEntriesButton")!.onclick = getAllEntries;
document.getElementById("getAllExercisesButton")!.onclick = getAllExercises;
document.getElementById("getAllWorkoutsButton")!.onclick = getAllWorkouts;

addEventListenerForEntryById()
addEventListenerForExerciseById()
addEventListenerForWorkoutById()