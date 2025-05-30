import type { Workout } from "../../../models/workout";
import { checkAndGetRestResponse, throwAlertError } from "../../../utilities/errors";
import { validateDate, validateInputsExist } from "../../../utilities/inputValidation";
import { generateWorkoutTable } from "../workoutUtils";

export function addEventListenerForUpdateWorkout() {
  document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById(
      "updateWorkoutButton",
    ) as HTMLButtonElement;
    const idInput = document.getElementById(
      "updateWorkoutIdInput",
    ) as HTMLInputElement;
    const nameInput = document.getElementById(
      "updateWorkoutNameInput",
    ) as HTMLInputElement;
    const dateInput = document.getElementById(
      "updateWorkoutDateInput",
    ) as HTMLInputElement;

    button.addEventListener("click", () => {
      if (!validateInputsExist([idInput.value, nameInput.value, dateInput.value])) {
        throwAlertError("Empty Input");
      } else {
        const id = Number(idInput.value);
        const name = nameInput.value;
        const date = dateInput.value;
        if (!isNaN(id) && typeof name === "string" && typeof date === "string" && validateDate(date)) {
          updateWorkout(id, name, date);
        } else {
          throwAlertError("Invalid input (YYYY-MM-DD required)");
        }
      }
    });
  });
}

function updateWorkout(id: number, name: string, date: string) {
  fetch(
    `${import.meta.env.VITE_BASE_API_URL}/workout/update?id=${id}&name=${name}&date=${date}`,
    {
      method: "PUT",
    },
  )
    .then(async function (response) {
      let payload = await checkAndGetRestResponse(response);
      let workout = payload.payload as Array<Workout>;
      return workout;
    })
    .then(function (workout) {
      generateWorkoutTable(workout, "updateOutputEnd");
    });
}
