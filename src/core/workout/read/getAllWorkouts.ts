import type { Workout } from "../../../models/workout";
import { checkAndGetRestResponse } from "../../../utilities/errors";
import { generateWorkoutTable } from "../workoutUtils";
import Chart, { type ChartItem } from 'chart.js/auto'

export function getAllWorkouts() {
  fetch(`${import.meta.env.VITE_BASE_API_URL}/workout/get`)
    .then(async function (response) {
      let payload = await checkAndGetRestResponse(response);
      let workout = payload.payload as Array<Workout>;
      return workout;
    })
    .then(function (workout) {
      generateWorkoutTable(workout, "getAllOutputEnd");
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

  const container1 = document.getElementsByClassName('row')[0] as HTMLElement
  container1!.style.display = 'flex';

  new Chart(
    document.getElementById('chart1') as ChartItem,
    {
      type: 'bar',
      data: {
        labels: Object.keys(countMap),
        datasets: [
          {
            label: 'workouts',
            data: Object.values(countMap)
          }
        ]
      }
    }
  );

  let workoutName: string[] = []
  let countMap2: Record<string, number> =  {};

  workout.map( row => {
    const value = row.name
    workoutName.push(value)
  })

  workoutName.forEach(element => {
  if (countMap2[element] === undefined) {
    countMap2[element] = 1;
  } else {
    countMap2[element] += 1;
  }
  });

  new Chart(
    document.getElementById('chart2') as ChartItem,
    {
      type: 'bar',
      data: {
        labels: Object.keys(countMap2),
        datasets: [
          {
            label: 'workouts',
            data: Object.values(countMap2)
          }
        ]
      }
    }
  );
};
