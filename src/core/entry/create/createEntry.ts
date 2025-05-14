// import type { Entry } from "../../../models/entry";
// import { generateEntryTable } from "../entryUtils";

// export function addEventListenerForCreateEntry() {
//   document.addEventListener("DOMContentLoaded", () => {
//     const button = document.getElementById("createEntryButton") as HTMLButtonElement;
//     const input = document.getElementById("createEntryInput") as HTMLInputElement;
  
//     button.addEventListener("click", () => {
//       const payload = input.value;
//       if (typeof payload === 'string') {
//         createEntry(payload);
//       } else {
//         console.error("Invalid input");
//       }
//     });
//   });
// }

// function createEntry(input: string) {
//   const inputAsArr = input.split(",")
//   const workoutId = inputAsArr[0]
//   const exerciseId = inputAsArr[1]
//   const weight = inputAsArr[2]
//   const sets = inputAsArr[3]
//   const reps = inputAsArr[4]
//   fetch(`${import.meta.env.VITE_BASE_API_URL}/entry/create?workoutId=${workoutId}&exerciseId=${exerciseId}&weight=${weight}&sets=${sets}&reps=${reps}`, {
//     method: 'POST'})
//     .then(async function (response) {
//       let payload = await response.json();      
//       let entry = payload.payload as Array<Entry>;
//       return entry;
//     })
//     .then(function (entry) {
//       generateEntryTable(entry, "getEntryByOutputEnd");
//     });
// }