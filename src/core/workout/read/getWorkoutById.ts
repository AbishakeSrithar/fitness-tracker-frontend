import type { Workout } from "../../../models/workout";
import { checkAndGetRestResponse, throwAlertError } from "../../../utilities/errors";
import { validateInputsExist } from "../../../utilities/inputValidation";
import { generateWorkoutTable } from "../workoutUtils";

export function addEventListenerForGetWorkoutById() {
  document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById(
      "getWorkoutByIdButton",
    ) as HTMLButtonElement;
    const input = document.getElementById(
      "getWorkoutByIdInput",
    ) as HTMLInputElement;

    button.addEventListener("click", () => {
      if (!validateInputsExist([input.value])) {
        throwAlertError("Empty Input");
      } else {
        const id = Number(input.value);
        if (!isNaN(id)) {
          getWorkoutById(id);
        } else {
          throwAlertError("Invalid input");
        }
      }
    });
  });
}

function getWorkoutById(input: number) {
  fetch(`${import.meta.env.VITE_BASE_API_URL}/workout/get/byId?id=${input}`)
    .then(async function (response) {
      let payload = await checkAndGetRestResponse(response);
      let workout = payload.payload as Array<Workout>;
      return workout;
    })
    .then(function (workout) {
      generateWorkoutTable(workout, "getWorkoutByOutputEnd");
    });
}
