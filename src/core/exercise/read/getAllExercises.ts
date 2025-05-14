import type { Exercise } from "../../../models/exercise";
import { generateExerciseTable } from "../exerciseUtils";

export function getAllExercises() {
  fetch(`${import.meta.env.VITE_BASE_API_URL}/exercise/get`)
    .then(async function (response) {
      let payload = await response.json();
      let exercise = payload.payload as Array<Exercise>;
      return exercise;
    })
    .then(function (exercise) {
      generateExerciseTable(exercise, "getAllOutputEnd");
    });
}
