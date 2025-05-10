// type JSONValue =
//     | string
//     | number
//     | boolean
//     | { [x: string]: JSONValue }
//     | Array<JSONValue>;
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var DateTypes;
(function (DateTypes) {
    DateTypes[DateTypes["Workout"] = 0] = "Workout";
    DateTypes[DateTypes["Entry"] = 1] = "Entry";
    DateTypes[DateTypes["Exercise"] = 2] = "Exercise";
})(DateTypes || (DateTypes = {}));
document.getElementById("getAllEntriesButton").onclick = getAllEntries;
document.getElementById("getAllExercisesButton").onclick = getAllExercises;
document.getElementById("getAllWorkoutsButton").onclick = getAllWorkouts;
function getAllEntries() {
    fetch("http://localhost:8080/api/entry/get")
        .then(function (response) {
        return __awaiter(this, void 0, void 0, function () {
            var payload, entry;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, response.json()];
                    case 1:
                        payload = _a.sent();
                        entry = payload.payload;
                        return [2 /*return*/, entry];
                }
            });
        });
    }).then(function (entry) {
        generateTable(entry, DateTypes.Entry);
    });
}
function getAllExercises() {
    fetch("http://localhost:8080/api/exercise/get")
        .then(function (response) {
        return __awaiter(this, void 0, void 0, function () {
            var payload, exercise;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, response.json()];
                    case 1:
                        payload = _a.sent();
                        exercise = payload.payload;
                        return [2 /*return*/, exercise];
                }
            });
        });
    }).then(function (data) {
        generateTable(data, DateTypes.Exercise);
    });
}
function getAllWorkouts() {
    fetch("http://localhost:8080/api/workout/get")
        .then(function (response) {
        return __awaiter(this, void 0, void 0, function () {
            var payload, entry;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, response.json()];
                    case 1:
                        payload = _a.sent();
                        entry = payload.payload;
                        return [2 /*return*/, entry];
                }
            });
        });
    }).then(function (data) {
        generateTable(data, DateTypes.Workout);
    });
}
function generateTable(data, dataType) {
    var prevTable = document.querySelector("table");
    if (prevTable) {
        prevTable.remove();
    }
    var tbl = document.createElement("table");
    var tblBody = document.createElement("tbody");
    console.log(Array.isArray(data));
    if (Array.isArray(data)) {
        for (var i = 0; i < data.length; i++) {
            var row = generateRow(data[i], dataType);
            // add the row to the end of the table body
            tblBody.appendChild(row);
        }
    }
    else {
        var row = generateRow(data, dataType);
        tblBody.appendChild(row);
    }
    // put the <tbody> in the <table>
    tbl.appendChild(tblBody);
    // appends <table> into <body>
    document.body.appendChild(tbl);
    // sets the border attribute of tbl to '2'
    tbl.setAttribute("border", "2");
}
function generateRow(input, dataType) {
    switch (dataType) {
        case DateTypes.Workout:
            return generateWorkoutRow(input);
        case DateTypes.Exercise:
            return generateExerciseRow(input);
        case DateTypes.Entry:
            return generateEntryRow(input);
    }
}
function generateExerciseRow(input) {
    var row = document.createElement("tr");
    var cell1 = document.createElement("td");
    var cell1Text = document.createTextNode("id: ".concat(input.id));
    cell1.appendChild(cell1Text);
    row.appendChild(cell1);
    var cell2 = document.createElement("td");
    var cell2Text = document.createTextNode("name: ".concat(input.name));
    cell2.appendChild(cell2Text);
    row.appendChild(cell2);
    var cell3 = document.createElement("td");
    var cell3Text = document.createTextNode("description: ".concat(input.description));
    cell3.appendChild(cell3Text);
    row.appendChild(cell3);
    return row;
}
function generateWorkoutRow(input) {
    var row = document.createElement("tr");
    var cell1 = document.createElement("td");
    var cell1Text = document.createTextNode("id: ".concat(input.id));
    cell1.appendChild(cell1Text);
    row.appendChild(cell1);
    var cell2 = document.createElement("td");
    var cell2Text = document.createTextNode("name: ".concat(input.name));
    cell2.appendChild(cell2Text);
    row.appendChild(cell2);
    var cell3 = document.createElement("td");
    var cell3Text = document.createTextNode("date: ".concat(input.date));
    cell3.appendChild(cell3Text);
    row.appendChild(cell3);
    return row;
}
function generateEntryRow(input) {
    var row = document.createElement("tr");
    var cell1 = document.createElement("td");
    var cell1Text = document.createTextNode("id: ".concat(input.id));
    cell1.appendChild(cell1Text);
    row.appendChild(cell1);
    var cell2 = document.createElement("td");
    var cell2Text = document.createTextNode("workoutId: ".concat(input.workoutId));
    cell2.appendChild(cell2Text);
    row.appendChild(cell2);
    var cell3 = document.createElement("td");
    var cell3Text = document.createTextNode("exerciseId: ".concat(input.exerciseId));
    cell3.appendChild(cell3Text);
    row.appendChild(cell3);
    var cell4 = document.createElement("td");
    var cell4Text = document.createTextNode("weight: ".concat(input.weight));
    cell4.appendChild(cell4Text);
    row.appendChild(cell4);
    var cell5 = document.createElement("td");
    var cell5Text = document.createTextNode("sets: ".concat(input.sets));
    cell5.appendChild(cell5Text);
    row.appendChild(cell5);
    var cell6 = document.createElement("td");
    var cell6Text = document.createTextNode("reps: ".concat(input.reps));
    cell6.appendChild(cell6Text);
    row.appendChild(cell6);
    return row;
}
