import type { Workout } from "../../../models/workout";
import { checkAndGetRestResponse, throwAlertError } from "../../../utilities/errors";
import { validateDate, validateInputsExist } from "../../../utilities/inputValidation";
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
      if (!validateInputsExist([input.value])) {
        throwAlertError("Empty Input");
      } else {
        const date = input.value;
        if (typeof date === "string" && validateDate(date)) {
          getWorkoutsByDate(date);
        } else {
          throwAlertError("Invalid input (YYYY-MM-DD required)");
        }
      }
    });
  });
}

function getWorkoutsByDate(input: string) {
  fetch(`${import.meta.env.VITE_BASE_API_URL}/workout/get/byDate?date=${input}`)
    .then(async function (response) {
      let payload = await checkAndGetRestResponse(response);
      let workout = payload.payload as Array<Workout>;
      return workout;
    })
    .then(function (workout) {
      generateWorkoutTable(workout, "getWorkoutByOutputEnd");
    });
}
