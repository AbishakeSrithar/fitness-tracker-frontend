import type { Exercise } from "../../models/exercise";
import { generateExerciseTable } from "./exerciseUtils";

export function addEventListenerForExerciseByName() {
  document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById("getExercisesByNameButton") as HTMLButtonElement;
    const input = document.getElementById("getExercisesByNameInput") as HTMLInputElement;
  
    button.addEventListener("click", () => {
      const name = input.value;
      if (typeof name === 'string') {
        getExerciseByName(name);
      } else {
        console.error("Invalid input");
      }
    });
  });
}

function getExerciseByName(input: string) {;
  fetch(`http://localhost:8080/api/exercise/get/byName?name=${input}`)
    .then(async function (response) {
      let payload = await response.json();      
      let exercise = payload.payload as Array<Exercise>;
      return exercise;
    })
    .then(function (exercise) {
      generateExerciseTable(exercise, "getByOutpgetExerciseByOutputEndutEnd");
    });
}