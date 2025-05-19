import type { Workout } from "../../../models/workout";
import { checkAndGetRestResponse } from "../../../utilities/errors";
import { generateWorkoutTable } from "../workoutUtils";

export function addEventListenerForGetWorkoutsByName() {
  document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById(
      "getWorkoutsByNameButton",
    ) as HTMLButtonElement;
    const input = document.getElementById(
      "getWorkoutsByNameInput",
    ) as HTMLInputElement;

    button.addEventListener("click", () => {
      const name = input.value;
      if (typeof name === "string") {
        getWorkoutsByName(name);
      } else {
        console.error("Invalid input");
      }
    });
  });
}

function getWorkoutsByName(input: string) {
  fetch(`${import.meta.env.VITE_BASE_API_URL}/workout/get/byName?name=${input}`)
    .then(async function (response) {
      let payload = await checkAndGetRestResponse(response);
      let workout = payload.payload as Array<Workout>;
      return workout;
    })
    .then(function (workout) {
      generateWorkoutTable(workout, "getWorkoutByOutputEnd");
    });
}
