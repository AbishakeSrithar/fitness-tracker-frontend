import type { Entry } from "../../models/entry";
import { generateRow } from "../../utilities/tableUtility";

export function generateEntryTable(data: Entry[], insertBefore: string) {
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
  const div = document.getElementById(insertBefore);
  const parent = document.getElementById("content")
  parent!.insertBefore(tbl, div);
}
