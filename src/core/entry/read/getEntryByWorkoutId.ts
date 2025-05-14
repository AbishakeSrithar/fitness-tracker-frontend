import type { Entry } from "../../../models/entry";
import { generateEntryTable } from "../entryUtils";

export function addEventListenerForGetEntryByWorkoutId() {
  document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById("getEntryByWorkoutIdButton") as HTMLButtonElement;
    const input = document.getElementById("getEntryByWorkoutIdInput") as HTMLInputElement;
  
    button.addEventListener("click", () => {
      const id = Number(input.value);
      if (!isNaN(id)) {
        getEntryByWorkoutId(id);
      } else {
        console.error("Invalid input");
      }
    });
  });
}

function getEntryByWorkoutId(input: number) {;
  fetch(`${import.meta.env.VITE_BASE_API_URL}/entry/get/byWorkoutId?workoutId=${input}`)
    .then(async function (response) {
      let payload = await response.json();      
      let entry = payload.payload as Array<Entry>;
      return entry;
    })
    .then(function (entry) {
      generateEntryTable(entry, "getEntryByOutputEnd");
    });
}