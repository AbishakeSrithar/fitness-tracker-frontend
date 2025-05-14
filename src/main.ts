import "./style.css";
import { getAllEntries } from "./core/entry/getAllEntries";
import { getAllExercises } from "./core/exercise/getAllExercises";
import { getAllWorkouts } from "./core/workout/getAllWorkouts";

import { addEventListenerForEntryById } from "./core/entry/getEntryById";
import { addEventListenerForExerciseById } from "./core/exercise/getExerciseById";
import { addEventListenerForWorkoutById } from "./core/workout/getWorkoutById";

import { addEventListenerForWorkoutsByName } from "./core/workout/getWorkoutsByName";
import { addEventListenerForWorkoutsByDate } from "./core/workout/getWorkoutsByDate";
import { addEventListenerForExerciseByName } from "./core/exercise/getExercisesByName";
import { addEventListenerForEntryByWorkoutId } from "./core/entry/getEntryByWorkoutId";
import { addEventListenerForEntryByExerciseId } from "./core/entry/getEntryByExerciseId";

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