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

//ChartJS
import Chart, { type ChartItem } from 'chart.js/auto'

(async function() {
  const data = [
    { year: 2010, count: 10 },
    { year: 2011, count: 20 },
    { year: 2012, count: 15 },
    { year: 2013, count: 25 },
    { year: 2014, count: 22 },
    { year: 2015, count: 30 },
    { year: 2016, count: 28 },
  ];

  new Chart(
    document.getElementById('acquisitions') as ChartItem,
    {
      type: 'bar',
      data: {
        labels: data.map(row => row.year),
        datasets: [
          {
            label: 'Acquisitions by year',
            data: data.map(row => row.count)
          }
        ]
      }
    }
  );
})();


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


