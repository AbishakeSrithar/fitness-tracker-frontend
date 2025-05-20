import type { Entry } from "../../../models/entry";
import { checkAndGetRestResponse, throwAlertError } from "../../../utilities/errors";
import { generateEntryTable } from "../entryUtils";
import { validateInputsExist } from "../../../utilities/inputValidation";

export function addEventListenerForDeleteEntry() {
  document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById(
      "deleteEntryButton",
    ) as HTMLButtonElement;
    const idInput = document.getElementById(
      "deleteEntryByIdInput",
    ) as HTMLInputElement;

    button.addEventListener("click", () => {
      if (!validateInputsExist([idInput.value])) {
        throwAlertError("Empty Input");
      } else {
        const id = Number(idInput.value);
        if (!isNaN(id)) {
          deleteEntry(id);
        } else {
          throwAlertError("Invalid input");
        }
      }
    });
  });
}

function deleteEntry(id: number) {
  fetch(`${import.meta.env.VITE_BASE_API_URL}/entry/delete?id=${id}`, {
    method: "DELETE",
  })
    .then(async function (response) {
      let payload = await checkAndGetRestResponse(response);
      let entry = payload.payload as Array<Entry>;
      return entry;
    })
    .then(function (entry) {
      generateEntryTable(entry, "deleteOutputEnd");
    });
}
