import type { Exercise } from "../../../models/exercise";
import { checkAndGetRestResponse } from "../../../utilities/errors";
import { generateExerciseTable } from "../exerciseUtils";

export function addEventListenerForUpdateExercise() {
  document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById(
      "updateExerciseButton",
    ) as HTMLButtonElement;
    const idInput = document.getElementById(
      "updateIdInput",
    ) as HTMLInputElement;
    const nameInput = document.getElementById(
      "updateExerciseNameInput",
    ) as HTMLInputElement;
    const descriptionInput = document.getElementById(
      "updateExerciseDescriptionInput",
    ) as HTMLInputElement;

    button.addEventListener("click", () => {
      const id = Number(idInput.value);
      const name = nameInput.value;
      const description = descriptionInput.value;
      if (
        !isNaN(id) &&
        typeof name === "string" &&
        typeof description === "string"
      ) {
        updateExercise(id, name, description);
      } else {
        console.error("Invalid input");
      }
    });
  });
}

function updateExercise(id: number, name: string, description: string) {
  fetch(
    `${import.meta.env.VITE_BASE_API_URL}/exercise/update?id=${id}&name=${name}&description=${description}`,
    {
      method: "PUT",
    },
  )
    .then(async function (response) {
      let payload = await checkAndGetRestResponse(response);
      let exercise = payload.payload as Array<Exercise>;
      return exercise;
    })
    .then(function (exercise) {
      generateExerciseTable(exercise, "updateOutputEnd");
    });
}
