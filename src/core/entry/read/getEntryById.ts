import type { Entry } from "../../../models/entry";
import { generateEntryTable } from "../entryUtils";

export function addEventListenerForEntryById() {
  document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById("getEntryByIdButton") as HTMLButtonElement;
    const input = document.getElementById("getEntryByIdInput") as HTMLInputElement;
  
    button.addEventListener("click", () => {
      const id = Number(input.value);
      if (!isNaN(id)) {
        getEntryById(id);
      } else {
        console.error("Invalid input");
      }
    });
  });
}

function getEntryById(input: number) {;
  fetch(`http://localhost:8080/api/entry/get/byId?id=${input}`)
    .then(async function (response) {
      let payload = await response.json();      
      let entry = payload.payload as Array<Entry>;
      return entry;
    })
    .then(function (entry) {
      generateEntryTable(entry, "getEntryByOutputEnd");
    });
}