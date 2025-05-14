import type { Workout } from "../../models/workout";
import { generateWorkoutTable } from "./workoutUtils";

export function addEventListenerForWorkoutsByDate() {
  document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById("getWorkoutsByDateButton") as HTMLButtonElement;
    const input = document.getElementById("getWorkoutsByDateInput") as HTMLInputElement;
  
    button.addEventListener("click", () => {
      const date = input.value;
      if (typeof date === 'string') {
        getWorkoutsByDate(date);
      } else {
        console.error("Invalid input");
      }
    });
  });
}

function getWorkoutsByDate(input: string) {;  
  fetch(`http://localhost:8080/api/workout/get/byDate?date=${input}`)
    .then(async function (response) {
      let payload = await response.json();
      let workout = payload.payload as Array<Workout>;
      return workout;
    })
    .then(function (workout) {
      generateWorkoutTable(workout, "getWorkoutByOutputEnd");
    });
}