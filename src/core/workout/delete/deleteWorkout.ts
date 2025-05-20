import type { Workout } from "../../../models/workout";
import { checkAndGetRestResponse, throwAlertError } from "../../../utilities/errors";
import { validateInputsExist } from "../../../utilities/inputValidation";
import { generateWorkoutTable } from "../workoutUtils";

export function addEventListenerForDeleteWorkout() {
  document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById(
      "deleteWorkoutButton",
    ) as HTMLButtonElement;
    const idInput = document.getElementById(
      "deleteWorkoutByIdInput",
    ) as HTMLInputElement;

    button.addEventListener("click", () => {
      if (!validateInputsExist([idInput.value])) {
        throwAlertError("Empty Input");
      } else {
        const id = Number(idInput.value);
        if (!isNaN(id)) {
          deleteWorkout(id);
        } else {
          throwAlertError("Invalid input");
        }
      }
    });
  });
}

function deleteWorkout(id: number) {
  fetch(`${import.meta.env.VITE_BASE_API_URL}/workout/delete?id=${id}`, {
    method: "DELETE",
  })
    .then(async function (response) {
      let payload = await checkAndGetRestResponse(response);
      let workout = payload.payload as Array<Workout>;
      return workout;
    })
    .then(function (workout) {
      generateWorkoutTable(workout, "deleteOutputEnd");
    });
}
