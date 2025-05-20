import type { Exercise } from "../../../models/exercise";
import { checkAndGetRestResponse, throwAlertError } from "../../../utilities/errors";
import { validateInputsExist } from "../../../utilities/inputValidation";
import { generateExerciseTable } from "../exerciseUtils";

export function addEventListenerForGetExerciseByName() {
  document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById(
      "getExercisesByNameButton",
    ) as HTMLButtonElement;
    const input = document.getElementById(
      "getExercisesByNameInput",
    ) as HTMLInputElement;

    button.addEventListener("click", () => {
      if (!validateInputsExist([input.value])) {
        throwAlertError("Empty Input");
      } else {
        const name = input.value;
        if (typeof name === "string") {
          getExerciseByName(name);
        } else {
          throwAlertError("Invalid input");
        }
      }
    });
  });
}

function getExerciseByName(input: string) {
  fetch(
    `${import.meta.env.VITE_BASE_API_URL}/exercise/get/byName?name=${input}`,
  )
    .then(async function (response) {
      let payload = await checkAndGetRestResponse(response);
      let exercise = payload.payload as Array<Exercise>;
      return exercise;
    })
    .then(function (exercise) {
      generateExerciseTable(exercise, "getExerciseByOutputEnd");
    });
}
