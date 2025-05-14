import type { Exercise } from "../../../models/exercise";
import { generateExerciseTable } from "../exerciseUtils";

export function getAllExercises() {
  fetch("http://localhost:8080/api/exercise/get")
    .then(async function (response) {
      let payload = await response.json();
      let exercise = payload.payload as Array<Exercise>;
      return exercise;
    })
    .then(function (exercise) {
      generateExerciseTable(exercise, "getAllOutputEnd");
    });
}
