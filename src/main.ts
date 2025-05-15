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

// Get All
document.getElementById("getAllEntriesButton")!.onclick = getAllEntries;
document.getElementById("getAllExercisesButton")!.onclick = getAllExercises;
document.getElementById("getAllWorkoutsButton")!.onclick = getAllWorkouts;

// Get By Id
addEventListenerForGetEntryById()

// Workout Get By
addEventListenerForGetWorkoutById()
addEventListenerForGetWorkoutsByName()
addEventListenerForGetWorkoutsByDate()

// Exercise Get By
addEventListenerForGetExerciseById()
addEventListenerForGetExerciseByName()
addEventListenerForGetEntryByWorkoutId()
addEventListenerForGetEntryByExerciseId()

addEventListenerForCreateEntry()
addEventListenerForCreateWorkout()
addEventListenerForCreateExercise()