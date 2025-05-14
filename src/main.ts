import "./style.css";
import { getAllEntries } from "./core/entry/read/getAllEntries";
import { getAllExercises } from "./core/exercise/read/getAllExercises";
import { getAllWorkouts } from "./core/workout/read/getAllWorkouts";

import { addEventListenerForEntryById } from "./core/entry/read/getEntryById";
import { addEventListenerForExerciseById } from "./core/exercise/read/getExerciseById";
import { addEventListenerForWorkoutById } from "./core/workout/read/getWorkoutById";

import { addEventListenerForWorkoutsByName } from "./core/workout/read/getWorkoutsByName";
import { addEventListenerForWorkoutsByDate } from "./core/workout/read/getWorkoutsByDate";
import { addEventListenerForExerciseByName } from "./core/exercise/read/getExercisesByName";
import { addEventListenerForEntryByWorkoutId } from "./core/entry/read/getEntryByWorkoutId";
import { addEventListenerForEntryByExerciseId } from "./core/entry/read/getEntryByExerciseId";

// Get All
document.getElementById("getAllEntriesButton")!.onclick = getAllEntries;
document.getElementById("getAllExercisesButton")!.onclick = getAllExercises;
document.getElementById("getAllWorkoutsButton")!.onclick = getAllWorkouts;

// Get By Id
addEventListenerForEntryById()

// Workout Get By
addEventListenerForWorkoutById()
addEventListenerForWorkoutsByName()
addEventListenerForWorkoutsByDate()

// Exercise Get By
addEventListenerForExerciseById()
addEventListenerForExerciseByName()
addEventListenerForEntryByWorkoutId()
addEventListenerForEntryByExerciseId()