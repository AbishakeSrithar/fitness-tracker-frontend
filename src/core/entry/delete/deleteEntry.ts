import type { Entry } from "../../../models/entry";
import { generateEntryTable } from "../entryUtils";

export function addEventListenerForDeleteEntry() {
  document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById("deleteEntryButton") as HTMLButtonElement;
    const idInput = document.getElementById("deleteEntryByIdInput") as HTMLInputElement;
  
    button.addEventListener("click", () => {
      const id = Number(idInput.value);
      if (!isNaN(id)) {
        deleteEntry(id);
      } else {
        console.error("Invalid input");
      }
    });
  });
}

function deleteEntry(id: number) {
  fetch(`${import.meta.env.VITE_BASE_API_URL}/entry/delete?id=${id}`, {
    method: 'DELETE'})
    .then(async function (response) {
      let payload = await response.json();
      let entry = payload.payload as Array<Entry>;
      return entry;
    })
    .then(function (entry) {
      generateEntryTable(entry, "deleteOutputEnd");
    });
}