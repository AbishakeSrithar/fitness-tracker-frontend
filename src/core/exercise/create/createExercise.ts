import type { Exercise } from "../../../models/exercise";
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
      const name = nameInput.value;
      const description = dateInput.value;
      if (
        typeof name === "string" &&
        typeof description === "string" &&
        name !== "" &&
        description !== ""
      ) {
        createExercise(name, description);
      } else {
        console.error("Invalid input");
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
      if (response.status == 200) {
        let payload = await response.json();
        let exercise = payload.payload as Array<Exercise>;
        return exercise;
      } else {
        console.error(`response.status == ${response.status}`);
        return [];
      }
    })
    .then(function (exercise) {
      generateExerciseTable(exercise, "createOutputEnd");
    });
}
