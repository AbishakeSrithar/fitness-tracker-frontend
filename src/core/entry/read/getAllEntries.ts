import type { Entry } from "../../../models/entry";
import { checkAndGetRestResponse } from "../../../utilities/errors";
import { generateEntryTable } from "../entryUtils";

export function getAllEntries() {
  fetch(`${import.meta.env.VITE_BASE_API_URL}/entry/get`)
    .then(async function (response) {
      let payload = await checkAndGetRestResponse(response);
      let entries = payload.payload as Array<Entry>;
      return entries;
    })
    .then(function (entries) {
      generateEntryTable(entries, "getAllOutputEnd");
    });
}