import type { Entry } from "../../../models/entry";
import { generateEntryTable } from "../entryUtils";

export function getAllEntries() {
  fetch("http://localhost:8080/api/entry/get")
    .then(async function (response) {
      let payload = await response.json();
      let entry = payload.payload as Array<Entry>;
      return entry;
    })
    .then(function (entry) {
      generateEntryTable(entry, "getAllOutputEnd");
    });
}