import type { Entry } from "../../../models/entry";
import { generateEntryTable } from "../entryUtils";

export function addEventListenerForCreateEntry() {
  document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById("createEntryButton") as HTMLButtonElement;
    const workoutIdInput = document.getElementById("createEntryWorkoutIdInput") as HTMLInputElement;
    const exerciseIdInput = document.getElementById("createEntryExerciseIdInput") as HTMLInputElement;
    const weightInput = document.getElementById("createEntryWeightInput") as HTMLInputElement;
    const setsInput = document.getElementById("createEntrySetsInput") as HTMLInputElement;
    const repsInput = document.getElementById("createEntryRepsInput") as HTMLInputElement;
  
    button.addEventListener("click", () => {
      const workoutId = Number(workoutIdInput.value);
      const exerciseId = Number(exerciseIdInput.value);
      const weight = Number(weightInput.value);
      const sets = Number(setsInput.value);
      const reps = Number(repsInput.value);
      if (!isNaN(workoutId) && !isNaN(exerciseId) && !isNaN(weight) && !isNaN(sets) && !isNaN(reps)) {
        createEntry(workoutId, exerciseId, weight, sets, reps);
      } else {
        console.error("Invalid input");
      }
    });
  });
}

function createEntry(workoutId: number, exerciseId: number, weight: number, sets: number, reps: number) {
  fetch(`${import.meta.env.VITE_BASE_API_URL}/entry/create?workoutId=${workoutId}&exerciseId=${exerciseId}&weight=${weight}&sets=${sets}&reps=${reps}`, {
    method: 'POST'})
    .then(async function (response) {
      let payload = await response.json();      
      let entry = payload.payload as Array<Entry>;
      return entry;
    })
    .then(function (entry) {
      generateEntryTable(entry, "createOutputEnd");
    });
}