import type { Entry } from "../../../models/entry";
import { generateEntryTable } from "../entryUtils";

export function getAllEntries() {
  fetch(`${import.meta.env.VITE_BASE_API_URL}/entry/get`)
    .then(async function (response) {
      let payload = await response.json();
      let entry = payload.payload as Array<Entry>;
      return entry;
    })
    .then(function (entry) {
      generateEntryTable(entry, "getAllOutputEnd");
    });
}