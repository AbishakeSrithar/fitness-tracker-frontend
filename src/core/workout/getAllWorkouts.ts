import type { Workout } from "../../models/workout";
import { generateWorkoutTable } from "./workoutUtils";

export function getAllWorkouts() {
  fetch("http://localhost:8080/api/workout/get")
    .then(async function (response) {
      let payload = await response.json();
      let workout = payload.payload as Array<Workout>;
      return workout;
    })
    .then(function (workout) {
      generateWorkoutTable(workout, "getAllOutputEnd");
    });
}