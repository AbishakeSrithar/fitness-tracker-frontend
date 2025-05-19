import type { Entry } from "../../../models/entry";
import { generateEntryTable } from "../entryUtils";
import {
  checkAndGetRestResponse,
  throwAlertError,
} from "../../../utilities/errors";
import { validateInputsExist } from "../../../utilities/inputValidation";

export function addEventListenerForGetEntryById() {
  document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById(
      "getEntryByIdButton",
    ) as HTMLButtonElement;
    const input = document.getElementById(
      "getEntryByIdInput",
    ) as HTMLInputElement;

    button.addEventListener("click", () => {
      if (!validateInputsExist([input.value])) {
        throwAlertError("Empty Input");
      } else {
        const id = Number(input.value);
        if (!isNaN(id)) {
          getEntryById(id);
        } else {
          throwAlertError("Invalid input");
        }
      }
    });
  });
}

function getEntryById(input: number) {
  fetch(`${import.meta.env.VITE_BASE_API_URL}/entry/get/byId?id=${input}`)
    .then(async function (response) {
      let payload = await checkAndGetRestResponse(response);
      let entry = payload.payload as Array<Entry>;
      return entry;
    })
    .then(function (entry) {
      generateEntryTable(entry, "getEntryByOutputEnd");
    });
}
