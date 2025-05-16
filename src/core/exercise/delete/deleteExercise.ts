import type { Exercise } from "../../../models/exercise";
import { generateExerciseTable } from "../exerciseUtils";

export function addEventListenerForDeleteExercise() {
  document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById("deleteExerciseButton") as HTMLButtonElement;
    const idInput = document.getElementById("deleteExerciseByIdInput") as HTMLInputElement;
  
    button.addEventListener("click", () => {
      const id = Number(idInput.value);
      if (!isNaN(id)) {
        deleteExercise(id);
      } else {
        console.error("Invalid input");
      }
    });
  });
}

function deleteExercise(id: number) {
  fetch(`${import.meta.env.VITE_BASE_API_URL}/exercise/delete?id=${id}`, {
    method: 'DELETE'})
    .then(async function (response) {
      let payload = await response.json();      
      let exercise = payload.payload as Array<Exercise>;
      return exercise;
    })
    .then(function (exercise) {
      generateExerciseTable(exercise, "deleteOutputEnd");
    });
}