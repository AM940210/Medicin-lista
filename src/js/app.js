// DATA
const residents = [
    {
        room: "1604",
        morning: ["08:00"],
        lunch: ["12:00"],
        dinner: ["14:00"],
        evening: ["20:00", "21:00"],
        shower: "Torsdag",
        notes: ""
    },
    {
        room: "1607",
        morning: ["08:00"],
        lunch: ["14:00"],
        dinner: [],
        evening: ["20:00", "23:00"],
        shower: "Måndag",
        notes: "Avföringlista"
    },
    {
        room: "1609",
        morning: ["06:00", "08:00", "09:00"],
        lunch: ["12:00", "14:00"],
        dinner: ["18:00"],
        evening: ["22:00"],
        shower: "Onsdag",
        notes: "Stödstrumpor"
    },
    {
        room: "1615",
        morning: ["08:00"],
        lunch: ["14:00"],
        dinner: [],
        evening: ["20:00", "22:00"],
        shower: "Söndag",
        notes: "Dörrlarm på"
    }
];

// HTML CONTAINER
const schedule = document.getElementById("schedule");


// LOAD SAVED DATA
let savedTasks = JSON.parse(localStorage.getItem("completedTasks")) || {};


// CREATE TASK
function createTask(room, time) {

    const taskId = `${room}-${time}`;

    const checked = savedTasks[taskId] ? "checked" : "";

    const doneClass = savedTasks[taskId] ? "done" : "";

    return `
        <div class="task">

            <input
                type="checkbox"
                ${checked}
                onchange="toggleTask('${taskId}', this)"
            />

            <span class="${doneClass}">
                Kl. ${time}
            </span>

        </div>
    `;
}