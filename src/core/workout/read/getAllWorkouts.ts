import type { Workout } from "../../../models/workout";
import { generateWorkoutTable } from "../workoutUtils";

export function getAllWorkouts() {
  fetch(`${import.meta.env.VITE_BASE_API_URL}/workout/get`)
    .then(async function (response) {
      let payload = await response.json();
      let workout = payload.payload as Array<Workout>;
      return workout;
    })
    .then(function (workout) {
      generateWorkoutTable(workout, "getAllOutputEnd");
    });
}