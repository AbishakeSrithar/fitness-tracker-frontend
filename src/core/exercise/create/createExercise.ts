import type { Exercise } from "../../../models/exercise";
import { generateExerciseTable } from "../exerciseUtils";

export function addEventListenerForCreateExercise() {
  document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById("createExerciseButton") as HTMLButtonElement;
    const idInput = document.getElementById("createExerciseIdInput") as HTMLInputElement;
    const nameInput = document.getElementById("createExerciseNameInput") as HTMLInputElement;
    const dateInput = document.getElementById("createExerciseDescriptionInput") as HTMLInputElement;
  
    button.addEventListener("click", () => {
      const id = Number(idInput.value);
      const name = nameInput.value;
      const description = dateInput.value;
      if (!isNaN(id) && typeof name === 'string' && typeof description === 'string') {
        createExercise(id, name, description);
      } else {
        console.error("Invalid input");
      }
    });
  });
}

function createExercise(id: number, name: string, description: string) {
  fetch(`${import.meta.env.VITE_BASE_API_URL}/exercise/create?id=${id}&name=${name}&description=${description}`, {
    method: 'POST'})
    .then(async function (response) {
      let payload = await response.json();      
      let exercise = payload.payload as Array<Exercise>;
      return exercise;
    })
    .then(function (exercise) {
      generateExerciseTable(exercise, "createOutputEnd");
    });
}