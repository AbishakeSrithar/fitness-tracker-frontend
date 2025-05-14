import type { Exercise } from "../../models/exercise";
import { generateRow } from "../../utilities/tableUtility";

export function generateExerciseTable(data: Exercise[], insertBefore: string) {
  const prevTable = document.querySelector("table");
  if (prevTable) {
    prevTable.remove();
  }
  const tbl = document.createElement("table");
  const tblBody = document.createElement("tbody");

  const headerRow = generateRow(["Id", "Name", "Description"]);
  tblBody.appendChild(headerRow);

  for (let i = 0; i < data.length; i++) {
    const row = generateRow([
      `${data[i].id}`,
      `${data[i].name}`,
      `${data[i].description}`,
    ]);

    // add the row to the end of the table body
    tblBody.appendChild(row);
  }

  // put the <tbody> in the <table>
  tbl.appendChild(tblBody);
  // appends <table> before div we're using as a divider
  const div = document.getElementById(insertBefore);
  document.body.insertBefore(tbl, div);
}