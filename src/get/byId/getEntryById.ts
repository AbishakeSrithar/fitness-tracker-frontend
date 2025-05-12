import type { Entry } from "../../models/entry";
import { generateRow } from "../../utilities/tableUtility";

export function getEntryById() {
  const inputElem = document.getElementById("getEntryByIdInput").value
  console.log(inputElem?.nodeValue);
  fetch("http://localhost:8080/api/entry/get")
    .then(async function (response) {
      let payload = await response.json();
      let entry = payload.payload as Array<Entry>;
      return entry;
    })
    .then(function (entry) {
      generateEntryTable(entry);
    });
}

function generateEntryTable(data: Entry[]) {
  const prevTable = document.querySelector("table");
  if (prevTable) {
    prevTable.remove();
  }
  const tbl = document.createElement("table");
  const tblBody = document.createElement("tbody");

  const headerRow = generateRow([
    "Id",
    "Workout Id",
    "Exercise Id",
    "Weight",
    "Sets",
    "Reps",
  ]);
  tblBody.appendChild(headerRow);

  for (let i = 0; i < data.length; i++) {
    const row = generateRow([
      `${data[i].id}`,
      `${data[i].workoutId}`,
      `${data[i].exerciseId}`,
      `${data[i].weight}`,
      `${data[i].sets}`,
      `${data[i].reps}`,
    ]);

    // add the row to the end of the table body
    tblBody.appendChild(row);
  }

  // put the <tbody> in the <table>
  tbl.appendChild(tblBody);
  // appends <table> before div we're using as a divider
  const div = document.getElementById("getAllOutputEnd");
  document.body.insertBefore(tbl, div);
}