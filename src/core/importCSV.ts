import { checkAndGetRestResponse } from "../utilities/errors";

export function importCSV() {
  fetch(`${import.meta.env.VITE_BASE_API_URL}/import/get`)
    .then(async function (response) {
      let payload = await checkAndGetRestResponse(response);
      return payload;
    });
}