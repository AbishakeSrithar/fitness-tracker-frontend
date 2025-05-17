import type { Workout } from "../../../models/workout";
import { generateWorkoutTable } from "../workoutUtils";

export function addEventListenerForCreateWorkout() {
  document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById(
      "createWorkoutButton",
    ) as HTMLButtonElement;
    const nameInput = document.getElementById(
      "createWorkoutNameInput",
    ) as HTMLInputElement;
    const dateInput = document.getElementById(
      "createWorkoutDateInput",
    ) as HTMLInputElement;

    button.addEventListener("click", () => {
      const name = nameInput.value;
      const date = dateInput.value;
      if (typeof name === "string" && typeof date === "string" && name !== "") {
        createWorkout(name, date);
      } else {
        console.error("Invalid input");
      }
    });
  });
}

function createWorkout(name: string, date: string) {
  fetch(
    `${import.meta.env.VITE_BASE_API_URL}/workout/create?name=${name}&date=${date}`,
    {
      method: "POST",
    },
  )
    .then(async function (response) {
      if (response.status == 200) {
        let payload = await response.json();
        let workout = payload.payload as Array<Workout>;
        return workout;
      } else {
        console.error(`response.status == ${response.status}`);
        return [];
      }
    })
    .then(function (workout) {
      generateWorkoutTable(workout, "createOutputEnd");
    });
}
