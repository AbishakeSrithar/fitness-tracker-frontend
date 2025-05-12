import type { Workout } from "../models/workout";
import { generateRow } from "../utilities/tableUtility";

export function getAllWorkouts() {
  fetch("http://localhost:8080/api/workout/get")
    .then(async function (response) {
      let payload = await response.json();
      let entry = payload.payload as Array<Workout>;
      return entry;
    })
    .then(function (data) {
      generateWorkoutTable(data);
    });
}

function generateWorkoutTable(data: Workout[]) {
  const prevTable = document.querySelector("table");
  if (prevTable) {
    prevTable.remove();
  }
  const tbl = document.createElement("table");
  const tblBody = document.createElement("tbody");

  const headerRow = generateRow(["Id", "Name", "Date"]);
  tblBody.appendChild(headerRow);

  for (let i = 0; i < data.length; i++) {
    const row = generateRow([
      `${data[i].id}`,
      `${data[i].name}`,
      `${data[i].date}`,
    ]);

    // add the row to the end of the table body
    tblBody.appendChild(row);
  }

  // put the <tbody> in the <table>
  tbl.appendChild(tblBody);
  // appends <table> into <body>
  document.body.appendChild(tbl);
}
