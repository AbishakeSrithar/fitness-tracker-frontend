import './style.css'
import { getAllEntries } from './get/all-entries'
import { getAllExercises } from './get/all-exercises'
import { getAllWorkouts } from './get/all-workouts'



document.getElementById("getAllEntriesButton")!.onclick = getAllEntries
document.getElementById("getAllExercisesButton")!.onclick = getAllExercises
document.getElementById("getAllWorkoutsButton")!.onclick = getAllWorkouts
