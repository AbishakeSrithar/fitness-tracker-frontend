import type { Exercise } from "../../../models/exercise";
import { checkAndGetRestResponse, throwAlertError } from "../../../utilities/errors";
import { validateInputsExist } from "../../../utilities/inputValidation";
import { generateExerciseTable } from "../exerciseUtils";

export function addEventListenerForDeleteExercise() {
  document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById(
      "deleteExerciseButton",
    ) as HTMLButtonElement;
    const idInput = document.getElementById(
      "deleteExerciseByIdInput",
    ) as HTMLInputElement;

    button.addEventListener("click", () => {
      if (!validateInputsExist([idInput.value])) {
        throwAlertError("Empty Input");
        } else {
          const id = Number(idInput.value);
          if (!isNaN(id)) {
            deleteExercise(id);
          } else {
            throwAlertError("Invalid input");
          }
        }
    });
  });
}

function deleteExercise(id: number) {
  fetch(`${import.meta.env.VITE_BASE_API_URL}/exercise/delete?id=${id}`, {
    method: "DELETE",
  })
    .then(async function (response) {
      let payload = await checkAndGetRestResponse(response);
      let exercise = payload.payload as Array<Exercise>;
      return exercise;
    })
    .then(function (exercise) {
      generateExerciseTable(exercise, "deleteOutputEnd");
    });
}
