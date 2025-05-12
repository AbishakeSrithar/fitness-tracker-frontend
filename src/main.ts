import "./style.css";
import { getAllEntries } from "./get/all/all-entries";
import { getAllExercises } from "./get/all/all-exercises";
import { getAllWorkouts } from "./get/all/all-workouts";

import { getEntryById } from "./get/byId/getEntryById";

document.getElementById("getAllEntriesButton")!.onclick = getAllEntries;
document.getElementById("getAllExercisesButton")!.onclick = getAllExercises;
document.getElementById("getAllWorkoutsButton")!.onclick = getAllWorkouts;

document.getElementById("getEntryByIdButton")!.onclick = getEntryById;
