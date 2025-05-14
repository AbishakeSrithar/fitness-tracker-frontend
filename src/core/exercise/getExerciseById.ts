import type { Exercise } from "../../models/exercise";
import { generateRow } from "../../utilities/tableUtility";

export function addEventListenerForExerciseById() {
  document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById("getExerciseByIdButton") as HTMLButtonElement;
    const input = document.getElementById("getExerciseByIdInput") as HTMLInputElement;
  
    button.addEventListener("click", () => {
      const id = Number(input.value);
      if (!isNaN(id)) {
        getExerciseById(id);
      } else {
        console.error("Invalid input");
      }
    });
  });
}

function getExerciseById(input: number) {;
  fetch(`http://localhost:8080/api/exercise/get/byId?id=${input}`)
    .then(async function (response) {
      let payload = await response.json();      
      let exercise = payload.payload as Array<Exercise>;
      return exercise;
    })
    .then(function (exercise) {
      generateExerciseTable(exercise);
    });
}

function generateExerciseTable(data: Exercise[]) {
  const prevTable = document.querySelector("table");
  if (prevTable) {
    prevTable.remove();
  }
  const tbl = document.createElement("table");
  const tblBody = document.createElement("tbody");

  const headerRow = generateRow([
    "Id",
    "Name",
    "Description"
  ]);
  tblBody.appendChild(headerRow);

  for (let i = 0; i < data.length; i++) {
    const row = generateRow([
      `${data[i].id}`,
      `${data[i].name}`,
      `${data[i].description}`
    ]);

    // add the row to the end of the table body
    tblBody.appendChild(row);
  }

  // put the <tbody> in the <table>
  tbl.appendChild(tblBody);
  // appends <table> before div we're using as a divider
  const div = document.getElementById("getByIdOutputEnd");
  document.body.insertBefore(tbl, div);
}