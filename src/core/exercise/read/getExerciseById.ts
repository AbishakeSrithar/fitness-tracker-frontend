import type { Exercise } from "../../../models/exercise";
import { checkAndGetRestResponse, throwAlertError } from "../../../utilities/errors";
import { validateInputsExist } from "../../../utilities/inputValidation";
import { generateExerciseTable } from "../exerciseUtils";

export function addEventListenerForGetExerciseById() {
  document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById(
      "getExerciseByIdButton",
    ) as HTMLButtonElement;
    const input = document.getElementById(
      "getExerciseByIdInput",
    ) as HTMLInputElement;

    button.addEventListener("click", () => {
      if (!validateInputsExist([input.value])) {
        throwAlertError("Empty Input");
      } else {
        const id = Number(input.value);
        if (!isNaN(id)) {
          getExerciseById(id);
        } else {
          throwAlertError("Invalid input");
        }
      }
    });
  });
}

function getExerciseById(input: number) {
  fetch(`${import.meta.env.VITE_BASE_API_URL}/exercise/get/byId?id=${input}`)
    .then(async function (response) {
      let payload = await checkAndGetRestResponse(response);
      let exercise = payload.payload as Array<Exercise>;
      return exercise;
    })
    .then(function (exercise) {
      generateExerciseTable(exercise, "getExerciseByOutputEnd");
    });
}
