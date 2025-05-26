import type { Workout } from "../../../models/workout";
import { checkAndGetRestResponse } from "../../../utilities/errors";
import { generateWorkoutTable } from "../workoutUtils";

export function getAllWorkouts() {
  fetch(`${import.meta.env.VITE_BASE_API_URL}/workout/get`)
    .then(async function (response) {
      let payload = await checkAndGetRestResponse(response);
      let workout = payload.payload as Array<Workout>;
      return workout;
    })
    .then(function (workout) {
      generateWorkoutTable(workout, "getAllOutputEnd");
    });
}
