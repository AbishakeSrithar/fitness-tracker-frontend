import type { Entry } from "../../../models/entry";
import { checkAndGetRestResponse, throwAlertError } from "../../../utilities/errors";
import { validateInputsExist } from "../../../utilities/inputValidation";
import { generateEntryTable } from "../entryUtils";

export function addEventListenerForGetEntryByExerciseId() {
  document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById(
      "getEntryByExerciseIdButton",
    ) as HTMLButtonElement;
    const input = document.getElementById(
      "getEntryByExerciseIdInput",
    ) as HTMLInputElement;

    button.addEventListener("click", () => {
      if (!validateInputsExist([input.value])) {
        throwAlertError("Empty Input");
        } else {
          const id = Number(input.value);
          if (!isNaN(id)) {
            getEntryByExerciseId(id);
          } else {
            throwAlertError("Invalid input");
          }
        }
    });
  });
}

function getEntryByExerciseId(input: number) {
  fetch(
    `${import.meta.env.VITE_BASE_API_URL}/entry/get/byExerciseId?exerciseId=${input}`,
  )
    .then(async function (response) {
      let payload = await checkAndGetRestResponse(response);
      let entry = payload.payload as Array<Entry>;
      return entry;
    })
    .then(function (entry) {
      generateEntryTable(entry, "getEntryByOutputEnd");
    });
}
