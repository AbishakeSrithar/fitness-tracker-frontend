import type { Entry } from "../../../models/entry";
import type { Exercise } from "../../../models/exercise";
import { checkAndGetRestResponse, throwAlertError } from "../../../utilities/errors";
import { validateInputsExist } from "../../../utilities/inputValidation";
import Chart, { type ChartItem } from 'chart.js/auto'

export function addEventListenerForGraphExercise() {
  document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById(
      "graphExerciseButton",
    ) as HTMLButtonElement;
    const input = document.getElementById(
      "graphExerciseInput",
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
      getEntriesByExerciseId(exercise[0]?.id, exercise[0]?.name)
    });
}

function getEntriesByExerciseId(input: number, name: string) {
  fetch(
    `${import.meta.env.VITE_BASE_API_URL}/entry/get/byExerciseId?exerciseId=${input}`,
  )
    .then(async function (response) {
      let payload = await checkAndGetRestResponse(response);
      let entry = payload.payload as Array<Entry>;
      return entry;
    })
    .then(function (entry) {
      graphExerciseEntries(entry, name);
    });
}

async function graphExerciseEntries(entry: Array<Entry>, name: string) {

  // let chart1Status = Chart.getChart("chart1");
  // if (chart1Status != undefined) {
  //   chart1Status.destroy();
  // }

  // let chart2Status = Chart.getChart("chart2");
  // if (chart2Status != undefined) {
  //   chart2Status.destroy();
  // }

  const container1 = document.getElementsByClassName('row2')[0] as HTMLElement
  container1!.style.display = 'flex';

  let nextFreeChartId = "chart3"

  if (Chart.getChart(nextFreeChartId)) {
    nextFreeChartId = "chart4"
  }
  if (Chart.getChart(nextFreeChartId)) {
    nextFreeChartId = "chart5"
  }
  if (Chart.getChart(nextFreeChartId)) {
    nextFreeChartId = "chart6"
  }
  if (Chart.getChart(nextFreeChartId)) {
    nextFreeChartId = "chart3"
    let chart3Status = Chart.getChart("chart3");
    if (chart3Status != undefined) {
      chart3Status.destroy();
    }
    let chart4Status = Chart.getChart("chart4");
    if (chart4Status != undefined) {
      chart4Status.destroy();
    }
    let chart5Status = Chart.getChart("chart5");
    if (chart5Status != undefined) {
      chart5Status.destroy();
    }
    let chart6Status = Chart.getChart("chart6");
    if (chart6Status != undefined) {
      chart6Status.destroy();
    }
  }

  const entriesLength = [...Array(entry.length).keys()].map(i => i + 1);

  let keys = entriesLength
  let weightMap: Record<string, number> = {};
  let repMap: Record<string, number> = {};

  keys.forEach(index => {
    weightMap[index] = entry[index - 1].weight
    repMap[index] = entry[index - 1].sets * entry[index - 1].reps
  }
  );

  let labels = Object.keys(weightMap)

  new Chart(
    document.getElementById(nextFreeChartId) as ChartItem,
    {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Weight',
            data: keys.map(key => weightMap[key] ?? 0),
            borderColor: '#34f89a',
            backgroundColor: '#45f9aa',
          },
          {
            label: 'Reps',
            data: keys.map(key => repMap[key] ?? 0),
            borderColor: '#63c947',
            backgroundColor: '#74da58',
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
            text: name
          }
        }
      }
    }
  );
};

