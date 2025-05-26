import type { Workout } from "../../../models/workout";
import { checkAndGetRestResponse } from "../../../utilities/errors";
import Chart, { type ChartItem } from 'chart.js/auto'

export function getAllWorkoutsAndGraph() {
  fetch(`${import.meta.env.VITE_BASE_API_URL}/workout/get`)
    .then(async function (response) {
      let payload = await checkAndGetRestResponse(response);
      let workout = payload.payload as Array<Workout>;
      return workout;
    })
    .then(function (workout) {
      graphWorkouts(workout)
    });
}

async function graphWorkouts(workout: Array<Workout>) {

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

  let workoutMonthsYears: string[] = []
  let countMap: Record<string, number> =  {};

  workout.map( row => {
    const value = row.date.slice(0, 7)
    workoutMonthsYears.push(value)
  })

  workoutMonthsYears.forEach(element => {
  if (countMap[element] === undefined) {
    countMap[element] = 1;
  } else {
    countMap[element] += 1;
  }
  });

  let pushMnthYr: string[] = []
  let pullMnthYr: string[] = []
  let legMnthYr: string[] = []
  let otherMnthYr: string[] = []
  let pushMnthYrMap: Record<string, number> =  {};
  let pullMnthYrMap: Record<string, number> =  {};
  let legMnthYrMap: Record<string, number> =  {};
  let otherMnthYrMap: Record<string, number> =  {};

  workout.map( row => {
    const value = row.date.slice(0, 7)
    if (row.name.includes("Push") || row.name.includes("Chest")) {
      pushMnthYr.push(value)
    } else if (row.name.includes("Pull") || row.name.includes("Back")) {
      pullMnthYr.push(value)
    } else if (row.name.includes("Lower") || row.name.includes("Leg")) {
      legMnthYr.push(value)
    } else {
      otherMnthYr.push(value)
    }
  })

  pushMnthYr.forEach(element => {
  if (pushMnthYrMap[element] === undefined) {
    pushMnthYrMap[element] = 1;
  } else {
    pushMnthYrMap[element] += 1;
  }
  });

  pullMnthYr.forEach(element => {
  if (pullMnthYrMap[element] === undefined) {
    pullMnthYrMap[element] = 1;
  } else {
    pullMnthYrMap[element] += 1;
  }
  });

  legMnthYr.forEach(element => {
  if (legMnthYrMap[element] === undefined) {
    legMnthYrMap[element] = 1;
  } else {
    legMnthYrMap[element] += 1;
  }
  });

  otherMnthYr.forEach(element => {
  if (otherMnthYrMap[element] === undefined) {
    otherMnthYrMap[element] = 1;
  } else {
    otherMnthYrMap[element] += 1;
  }
  });

  let labels = Object.keys(countMap).sort()

  console.log(countMap)
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
            data: labels.map(label => countMap[label] ?? 0)
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
            text: 'Total Workouts per Month'
          }
        },
        scales: {
            y: {
                suggestedMin: 0
            }
        }
      }
    }
  );

  new Chart(
    document.getElementById('chart2') as ChartItem,
    {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Chest',
            data: labels.map(label => pushMnthYrMap[label] ?? 0)
          },
          {
            label: 'Back',
            data: labels.map(label => pullMnthYrMap[label] ?? 0)
          },
          {
            label: 'Legs',
            data: labels.map(label => legMnthYrMap[label] ?? 0)
          },
          {
            label: 'Other',
            data: labels.map(label => otherMnthYrMap[label] ?? 0)
          }
        ]
      }
    }
  );
};
