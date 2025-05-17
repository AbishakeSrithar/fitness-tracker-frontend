import type { Workout } from "../../../models/workout";
import { generateWorkoutTable } from "../workoutUtils";

export function addEventListenerForDeleteWorkout() {
  document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById(
      "deleteWorkoutButton",
    ) as HTMLButtonElement;
    const idInput = document.getElementById(
      "deleteWorkoutByIdInput",
    ) as HTMLInputElement;

    button.addEventListener("click", () => {
      const id = Number(idInput.value);
      if (!isNaN(id)) {
        deleteWorkout(id);
      } else {
        console.error("Invalid input");
      }
    });
  });
}

function deleteWorkout(id: number) {
  fetch(`${import.meta.env.VITE_BASE_API_URL}/workout/delete?id=${id}`, {
    method: "DELETE",
  })
    .then(async function (response) {
      let payload = await response.json();
      let workout = payload.payload as Array<Workout>;
      return workout;
    })
    .then(function (workout) {
      generateWorkoutTable(workout, "deleteOutputEnd");
    });
}
