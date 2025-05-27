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

    button.addEventListener("click", async () => {
      if (!validateInputsExist([input.value])) {
        throwAlertError("Empty Input");
      } else {
        const name = input.value;
        if (typeof name === "string") {
          let exercise = await getExerciseByName(name);
          let entries = await getEntriesByExerciseId(exercise[0]?.id)
          graphExerciseEntries(entries, name)
        } else {
          throwAlertError("Invalid input");
        }
      }
    });
  });
}

async function getExerciseByName(input: string): Promise<Exercise[]>{
  return fetch(
    `${import.meta.env.VITE_BASE_API_URL}/exercise/get/byName?name=${input}`,
  )
    .then(async function (response) {
      let payload = await checkAndGetRestResponse(response);
      let exercise = payload.payload as Array<Exercise>;
      return exercise;
    })
}

async function getEntriesByExerciseId(input: number): Promise<Entry[]>{
  return fetch(
    `${import.meta.env.VITE_BASE_API_URL}/entry/get/byExerciseId?exerciseId=${input}`,
  )
    .then(async function (response) {
      let payload = await checkAndGetRestResponse(response);
      let entries = payload.payload as Array<Entry>;
      return entries;
    })
}

async function graphExerciseEntries(entry: Array<Entry>, name: string) {

  const container1 = document.getElementsByClassName('row2')[0] as HTMLElement
  container1!.style.display = 'flex';

  const chartIds = ["chart3", "chart4", "chart5", "chart6"]
  let nextFreeChartId = chartIds.find(id => !Chart.getChart(id))

  if (!nextFreeChartId) {
    chartIds.forEach(id => {
      const chart = Chart.getChart(id)
      chart?.destroy()
    })
    nextFreeChartId = "chart3"
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

