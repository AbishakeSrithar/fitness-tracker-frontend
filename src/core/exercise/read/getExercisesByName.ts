import type { Entry } from "../../../models/entry";
import type { Exercise } from "../../../models/exercise";
import { checkAndGetRestResponse, throwAlertError } from "../../../utilities/errors";
import { validateInputsExist } from "../../../utilities/inputValidation";
import { generateExerciseTable } from "../exerciseUtils";
import Chart, { type ChartItem } from 'chart.js/auto'

export function addEventListenerForGetExerciseByName() {
  document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById(
      "getExercisesByNameButton",
    ) as HTMLButtonElement;
    const input = document.getElementById(
      "getExercisesByNameInput",
    ) as HTMLInputElement;

    button.addEventListener("click", () => {
      if (!validateInputsExist([input.value])) {
        throwAlertError("Empty Input");
      } else {
        const name = input.value;
        if (typeof name === "string") {
          getExerciseByName(name);
        } else {
          throwAlertError("Invalid input");
        }
      }
    });
  });
}

function getExerciseByName(input: string) {
  fetch(
    `${import.meta.env.VITE_BASE_API_URL}/exercise/get/byName?name=${input}`,
  )
    .then(async function (response) {
      let payload = await checkAndGetRestResponse(response);
      let exercise = payload.payload as Array<Exercise>;
      return exercise;
    })
    .then(function (exercise) {
      generateExerciseTable(exercise, "getExerciseByOutputEnd");
      getEntriesByExerciseId(exercise[0]?.id)
    });
}

function getEntriesByExerciseId(input: number) {
  fetch(
    `${import.meta.env.VITE_BASE_API_URL}/entry/get/byExerciseId?exerciseId=${input}`,
  )
    .then(async function (response) {
      let payload = await checkAndGetRestResponse(response);
      let entry = payload.payload as Array<Entry>;
      return entry;
    })
    .then(function (entry) {
      graphExerciseEntries(entry);
    });
}

async function graphExerciseEntries(entry: Array<Entry>) {

  let chart1Status = Chart.getChart("chart1");
  if (chart1Status != undefined) {
    chart1Status.destroy();
  }

  let chart2Status = Chart.getChart("chart2");
  if (chart2Status != undefined) {
    chart2Status.destroy();
  }

  const container1 = document.getElementsByClassName('row')[0] as HTMLElement
  container1!.style.display = 'flex';

  const entriesLength = [...Array(entry.length).keys()].map(i => i + 1);

  let keys = entriesLength
  let weightMap: Record<string, number> =  {};

  console.log(keys)

  keys.forEach(index => { 
    weightMap[index] = entry[index - 1].weight });
  console.log(weightMap)

  let labels = Object.keys(weightMap)
  console.log(labels)

  new Chart(
    document.getElementById('chart1') as ChartItem,
    {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'workouts',
            data: keys.map(key => weightMap[key] ?? 0)
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Excercises'
          }
        }
      }
    }
  );
};

