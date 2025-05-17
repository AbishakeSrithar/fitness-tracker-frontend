import type { Workout } from "../../../models/workout";
import { generateWorkoutTable } from "../workoutUtils";

export function addEventListenerForUpdateWorkout() {
  document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById(
      "updateWorkoutButton",
    ) as HTMLButtonElement;
    const idInput = document.getElementById(
      "updateWorkoutIdInput",
    ) as HTMLInputElement;
    const nameInput = document.getElementById(
      "updateWorkoutNameInput",
    ) as HTMLInputElement;
    const dateInput = document.getElementById(
      "updateWorkoutDateInput",
    ) as HTMLInputElement;

    button.addEventListener("click", () => {
      const id = Number(idInput.value);
      const name = nameInput.value;
      const date = dateInput.value;
      if (!isNaN(id) && typeof name === "string" && typeof date === "string") {
        updateWorkout(id, name, date);
      } else {
        console.error("Invalid input");
      }
    });
  });
}

function updateWorkout(id: number, name: string, date: string) {
  fetch(
    `${import.meta.env.VITE_BASE_API_URL}/workout/update?id=${id}&name=${name}&date=${date}`,
    {
      method: "PUT",
    },
  )
    .then(async function (response) {
      let payload = await response.json();
      let workout = payload.payload as Array<Workout>;
      return workout;
    })
    .then(function (workout) {
      generateWorkoutTable(workout, "updateOutputEnd");
    });
}
