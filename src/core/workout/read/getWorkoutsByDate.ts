import type { Workout } from "../../../models/workout";
import { generateWorkoutTable } from "../workoutUtils";

export function addEventListenerForGetWorkoutsByDate() {
  document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById(
      "getWorkoutsByDateButton",
    ) as HTMLButtonElement;
    const input = document.getElementById(
      "getWorkoutsByDateInput",
    ) as HTMLInputElement;

    button.addEventListener("click", () => {
      const date = input.value;
      if (typeof date === "string") {
        getWorkoutsByDate(date);
      } else {
        console.error("Invalid input");
      }
    });
  });
}

function getWorkoutsByDate(input: string) {
  fetch(`${import.meta.env.VITE_BASE_API_URL}/workout/get/byDate?date=${input}`)
    .then(async function (response) {
      let payload = await response.json();
      let workout = payload.payload as Array<Workout>;
      return workout;
    })
    .then(function (workout) {
      generateWorkoutTable(workout, "getWorkoutByOutputEnd");
    });
}
