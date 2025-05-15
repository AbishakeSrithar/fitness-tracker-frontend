import type { Workout } from "../../../models/workout";
import { generateWorkoutTable } from "../workoutUtils";

export function addEventListenerForCreateWorkout() {
  document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById("createWorkoutButton") as HTMLButtonElement;
    const idInput = document.getElementById("createWorkoutIdInput") as HTMLInputElement;
    const nameInput = document.getElementById("createWorkoutNameInput") as HTMLInputElement;
    const dateInput = document.getElementById("createWorkoutDateInput") as HTMLInputElement;
  
    button.addEventListener("click", () => {
      const id = Number(idInput.value);
      const name = nameInput.value;
      const date = dateInput.value;
      if (!isNaN(id) && typeof name === 'string' && typeof date === 'string') {
        createWorkout(id, name, date);
      } else {
        console.error("Invalid input");
      }
    });
  });
}

function createWorkout(id: number, name: string, date: string) {
  fetch(`${import.meta.env.VITE_BASE_API_URL}/workout/create?id=${id}&name=${name}&date=${date}`, {
    method: 'POST'})
    .then(async function (response) {
      let payload = await response.json();      
      let workout = payload.payload as Array<Workout>;
      return workout;
    })
    .then(function (workout) {
      generateWorkoutTable(workout, "createOutputEnd");
    });
}