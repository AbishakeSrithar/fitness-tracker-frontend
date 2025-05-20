import type { Entry } from "../../../models/entry";
import { checkAndGetRestResponse, throwAlertError } from "../../../utilities/errors";
import { validateInputsExist } from "../../../utilities/inputValidation";
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
      if (!validateInputsExist([idInput.value, weightInput.value, setsInput.value, repsInput.value])) {
        throwAlertError("Empty Input");
      } else {
        const id = Number(idInput.value);
        const weight = Number(weightInput.value);
        const sets = Number(setsInput.value);
        const reps = Number(repsInput.value);
        if (!isNaN(id) && !isNaN(weight) && !isNaN(sets) && !isNaN(reps)) {
          updateEntry(id, weight, sets, reps);
        } else {
          throwAlertError("Invalid input");
        }
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
      let payload = await checkAndGetRestResponse(response);
      let entry = payload.payload as Array<Entry>;
      return entry;
    })
    .then(function (entry) {
      generateEntryTable(entry, "updateOutputEnd");
    });
}
