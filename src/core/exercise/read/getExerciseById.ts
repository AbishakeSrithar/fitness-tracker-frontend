import type { Exercise } from "../../../models/exercise";
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
      const id = Number(input.value);
      if (!isNaN(id)) {
        getExerciseById(id);
      } else {
        console.error("Invalid input");
      }
    });
  });
}

function getExerciseById(input: number) {
  fetch(`${import.meta.env.VITE_BASE_API_URL}/exercise/get/byId?id=${input}`)
    .then(async function (response) {
      let payload = await response.json();
      let exercise = payload.payload as Array<Exercise>;
      return exercise;
    })
    .then(function (exercise) {
      generateExerciseTable(exercise, "getExerciseByOutputEnd");
    });
}
