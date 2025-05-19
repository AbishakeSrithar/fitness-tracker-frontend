import type { Exercise } from "../../../models/exercise";
import { checkAndGetRestResponse } from "../../../utilities/errors";
import { generateExerciseTable } from "../exerciseUtils";

export function getAllExercises() {
  fetch(`${import.meta.env.VITE_BASE_API_URL}/exercise/get`)
    .then(async function (response) {
      let payload = await checkAndGetRestResponse(response);
      let exercise = payload.payload as Array<Exercise>;
      return exercise;
    })
    .then(function (exercise) {
      generateExerciseTable(exercise, "getAllOutputEnd");
    });
}
