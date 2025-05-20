import type { Exercise } from "../../../models/exercise";
import { checkAndGetRestResponse, throwAlertError } from "../../../utilities/errors";
import { validateInputsExist } from "../../../utilities/inputValidation";
import { generateExerciseTable } from "../exerciseUtils";

export function addEventListenerForCreateExercise() {
  document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById(
      "createExerciseButton",
    ) as HTMLButtonElement;
    const nameInput = document.getElementById(
      "createExerciseNameInput",
    ) as HTMLInputElement;
    const dateInput = document.getElementById(
      "createExerciseDescriptionInput",
    ) as HTMLInputElement;

    button.addEventListener("click", () => {
      if (!validateInputsExist([nameInput.value, dateInput.value])) {
        throwAlertError("Empty Input");
        } else {
          const name = nameInput.value;
          const description = dateInput.value;
          if (
            typeof name === "string" &&
            typeof description === "string"
          ) {
            createExercise(name, description);
          } else {
            throwAlertError("Invalid input");
          }
        }
    });
  });
}

function createExercise(name: string, description: string) {
  fetch(
    `${import.meta.env.VITE_BASE_API_URL}/exercise/create?name=${name}&description=${description}`,
    {
      method: "POST",
    },
  )
    .then(async function (response) {
      let payload = await checkAndGetRestResponse(response);
      let exercise = payload.payload as Array<Exercise>;
      return exercise;
    })
    .then(function (exercise) {
      generateExerciseTable(exercise, "createOutputEnd");
    });
}
