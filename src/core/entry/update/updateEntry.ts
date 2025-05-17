import type { Entry } from "../../../models/entry";
import { generateEntryTable } from "../entryUtils";

export function addEventListenerForUpdateEntry() {
  document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById(
      "updateEntryButton",
    ) as HTMLButtonElement;
    const idInput = document.getElementById(
      "updateEntryIdInput",
    ) as HTMLInputElement;
    const weightInput = document.getElementById(
      "updateEntryWeightInput",
    ) as HTMLInputElement;
    const setsInput = document.getElementById(
      "updateEntrySetsInput",
    ) as HTMLInputElement;
    const repsInput = document.getElementById(
      "updateEntryRepsInput",
    ) as HTMLInputElement;

    button.addEventListener("click", () => {
      const id = Number(idInput.value);
      const weight = Number(weightInput.value);
      const sets = Number(setsInput.value);
      const reps = Number(repsInput.value);
      if (!isNaN(id) && !isNaN(weight) && !isNaN(sets) && !isNaN(reps)) {
        updateEntry(id, weight, sets, reps);
      } else {
        console.error("Invalid input");
      }
    });
  });
}

function updateEntry(id: number, weight: number, sets: number, reps: number) {
  fetch(
    `${import.meta.env.VITE_BASE_API_URL}/entry/update?id=${id}&weight=${weight}&sets=${sets}&reps=${reps}`,
    {
      method: "PUT",
    },
  )
    .then(async function (response) {
      let payload = await response.json();
      let entry = payload.payload as Array<Entry>;
      return entry;
    })
    .then(function (entry) {
      generateEntryTable(entry, "updateOutputEnd");
    });
}
