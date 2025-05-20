import type { Workout } from "../../../models/workout";
import { checkAndGetRestResponse, throwAlertError } from "../../../utilities/errors";
import { validateDate, validateInputsExist } from "../../../utilities/inputValidation";
import { generateWorkoutTable } from "../workoutUtils";

export function addEventListenerForCreateWorkout() {
  document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById(
      "createWorkoutButton",
    ) as HTMLButtonElement;
    const nameInput = document.getElementById(
      "createWorkoutNameInput",
    ) as HTMLInputElement;
    const dateInput = document.getElementById(
      "createWorkoutDateInput",
    ) as HTMLInputElement;

    button.addEventListener("click", () => {
      if (!validateInputsExist([nameInput.value])) { // dateInput.value optional param, so left out
        throwAlertError("Empty Input");
      } else {
        const name = nameInput.value;
        const date = dateInput.value;
        if (typeof name === "string" && typeof date === "string" && ((date !== "" && validateDate(date)) || date === "")) {
          createWorkout(name, date);
        } else {
          throwAlertError("Invalid input (YYYY-MM-DD required)");
        }
      }
    });
  });
}

function createWorkout(name: string, date: string) {
  fetch(
    `${import.meta.env.VITE_BASE_API_URL}/workout/create?name=${name}&date=${date}`,
    {
      method: "POST",
    },
  )
    .then(async function (response) {
      let payload = await checkAndGetRestResponse(response);
      let workout = payload.payload as Array<Workout>;
      return workout;
    })
    .then(function (workout) {
      generateWorkoutTable(workout, "createOutputEnd");
    });
}
