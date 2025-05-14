import type { Workout } from "../../models/workout";
import { generateRow } from "../../utilities/tableUtility";

export function addEventListenerForWorkoutById() {
  document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById("getWorkoutByIdButton") as HTMLButtonElement;
    const input = document.getElementById("getWorkoutByIdInput") as HTMLInputElement;
  
    button.addEventListener("click", () => {
      const id = Number(input.value);
      if (!isNaN(id)) {
        getWorkoutById(id);
      } else {
        console.error("Invalid input");
      }
    });
  });
}

function getWorkoutById(input: number) {;  
  fetch(`http://localhost:8080/api/workout/get/byId?id=${input}`)
    .then(async function (response) {
      let payload = await response.json();
      let workout = payload.payload as Array<Workout>;
      return workout;
    })
    .then(function (workout) {
      generateWorkoutTable(workout);
    });
}

function generateWorkoutTable(data: Workout[]) {
  const prevTable = document.querySelector("table");
  if (prevTable) {
    prevTable.remove();
  }
  const tbl = document.createElement("table");
  const tblBody = document.createElement("tbody");

  const headerRow = generateRow([
    "Id",
    "Name",
    "Date"
  ]);
  tblBody.appendChild(headerRow);
  for (let i = 0; i < data.length; i++) {
    const row = generateRow([
      `${data[i].id}`,
      `${data[i].name}`,
      `${data[i].date}`
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