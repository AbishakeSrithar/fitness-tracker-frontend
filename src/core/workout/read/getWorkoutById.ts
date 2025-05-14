import type { Workout } from "../../../models/workout";
import { generateWorkoutTable } from "../workoutUtils";

export function addEventListenerForWorkoutById() {
  document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById("getWorkoutByIdButton") as HTMLButtonElement;
    const input = document.getElementById("getWorkoutByIdInput") as HTMLInputElement;
  
    button.addEventListener("click", () => {
      const id = Number(input.value);
      if (!isNaN(id)) {
        getWorkoutById(id);
      } else {
        console.error("Invalid input");
      }
    });
  });
}

function getWorkoutById(input: number) {;  
  fetch(`http://localhost:8080/api/workout/get/byId?id=${input}`)
    .then(async function (response) {
      let payload = await response.json();
      let workout = payload.payload as Array<Workout>;
      return workout;
    })
    .then(function (workout) {
      generateWorkoutTable(workout, "getWorkoutByOutputEnd");
    });
}