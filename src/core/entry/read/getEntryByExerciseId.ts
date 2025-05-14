import type { Entry } from "../../../models/entry";
import { generateEntryTable } from "../entryUtils";

export function addEventListenerForGetEntryByExerciseId() {
  document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById("getEntryByExerciseIdButton") as HTMLButtonElement;
    const input = document.getElementById("getEntryByExerciseIdInput") as HTMLInputElement;
  
    button.addEventListener("click", () => {
      const id = Number(input.value);
      if (!isNaN(id)) {
        getEntryByExerciseId(id);
      } else {
        console.error("Invalid input");
      }
    });
  });
}

function getEntryByExerciseId(input: number) {;
  fetch(`${import.meta.env.VITE_BASE_API_URL}/entry/get/byExerciseId?exerciseId=${input}`)
    .then(async function (response) {
      let payload = await response.json();      
      let entry = payload.payload as Array<Entry>;
      return entry;
    })
    .then(function (entry) {
      generateEntryTable(entry, "getEntryByOutputEnd");
    });
}