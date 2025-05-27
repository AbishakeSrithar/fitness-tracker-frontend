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

  let chart1 = Chart.getChart("chart1");
  chart1?.destroy()
  let chart2 = Chart.getChart("chart2");
  chart2?.destroy()

  const container = document.getElementsByClassName('row')[0] as HTMLElement
  container!.style.display = 'flex';

  let workoutMonth: string[] = []
  let workoutCountMap: Record<string, number> =  {};

  workout.map( row => {
    const value = row.date.slice(0, 7)
    workoutMonth.push(value)
  })

  workoutMonth.forEach(element => {
  workoutCountMap[element] = (workoutCountMap[element] || 0) + 1;
  });

  let pushMnthYr: string[] = []
  let pullMnthYr: string[] = []
  let legMnthYr: string[] = []
  let otherMnthYr: string[] = []

  let pushMnthYrMap: Record<string, number> =  {};
  let pullMnthYrMap: Record<string, number> =  {};
  let legMnthYrMap: Record<string, number> =  {};
  let otherMnthYrMap: Record<string, number> =  {};

  const categoryMap: Record<string, string[]> = {
  push: ["push", "chest"],
  pull: ["pull", "back"],
  leg: ["lower", "leg"]
};

  workout.forEach( row => {
    const value = row.date.slice(0, 7)
    const name = row.name.toLowerCase();

    if (categoryMap.push.some(keyword => name.includes(keyword))) {
      pushMnthYr.push(value)
    } else if (categoryMap.pull.some(keyword => name.includes(keyword))) {
      pullMnthYr.push(value)
    } else if (categoryMap.leg.some(keyword => name.includes(keyword))) {
      legMnthYr.push(value)
    } else {
      otherMnthYr.push(value)
    }
  })

  pushMnthYr.forEach(element => {
    pushMnthYrMap[element] = (pushMnthYrMap[element] || 0) + 1
  })

  pullMnthYr.forEach(element => {
    pullMnthYrMap[element] = (pullMnthYrMap[element] || 0) + 1
  })

  legMnthYr.forEach(element => {
    legMnthYrMap[element] = (legMnthYrMap[element] || 0) + 1
  })

  otherMnthYr.forEach(element => {
    otherMnthYrMap[element] = (otherMnthYrMap[element] || 0) + 1
  })

  let labels = Object.keys(workoutCountMap).sort()

  new Chart(
    document.getElementById('chart1') as ChartItem,
    {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'workouts',
            data: labels.map(label => workoutCountMap[label] ?? 0)
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
