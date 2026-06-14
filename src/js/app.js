import { state } from "./state.js";

// DATA
export const residents = [
    {
        room: "1604",
        morning: ["08:00"],
        lunch: ["12:00"],
        dinner: ["14:00"],
        evening: ["20:00", "21:00"],
        shower: "Ons & Lör på Kväll + Renbäddning",
        notes: ""
    },
    {
        room: "1605",
        morning: ["08:00"],
        lunch: [""],
        dinner: [""],
        evening: ["20:00"],
        shower: "Torsdag + Renbäddning",
        notes: ""
    },
    {
        room: "1606",
        morning: [""],
        lunch: [""],
        dinner: [""],
        evening: [""],
        shower: "Onsdag + Renbäddning",
        notes: ""
    },
    {
        room: "1607",
        morning: ["08:00"],
        lunch: ["14:00"],
        dinner: [],
        evening: ["20:00", "23:00"],
        shower: "Måndag + Renbäddning",
        notes: "Avföringlista"
    },
    {
        room: "1608",
        morning: ["08:00"],
        lunch: [""],
        dinner: [""],
        evening: ["", ""],
        shower: "Lördag + Renbäddning",
        notes: "Avföringlista"
    },
    {
        room: "1609",
        morning: ["06:00", "08:00", "09:00"],
        lunch: ["12:00", "14:00"],
        dinner: ["18:00"],
        evening: ["22:00"],
        shower: "Onsdag + Renbäddning",
        notes: "Stödstrumpor"
    },
    {
        room: "1610",
        morning: ["08:00"],
        lunch: ["13:00"],
        dinner: ["17:00"],
        evening: ["21:00"],
        shower: "Fredag + Renbäddning",
        notes: ""
    },
    {
        room: "1611",
        morning: ["08:00"],
        lunch: ["14:00"],
        dinner: [""],
        evening: ["20:00", "21:30"],
        shower: "Måndag + Renbäddning",
        notes: ""
    },
    {
        room: "1612",
        morning: ["08:00"],
        lunch: ["14:00"],
        dinner: [""],
        evening: ["20:00"],
        shower: "Tisdag + Renbäddning",
        notes: ""
    },
    {
        room: "1613",
        morning: ["08:00"],
        lunch: [""],
        dinner: [""],
        evening: ["20:00", "21:00"],
        shower: "Fredag + Renbäddning",
        notes: ""
    },
    {
        room: "1614",
        morning: ["08:00"],
        lunch: [""],
        dinner: [""],
        evening: ["20:00"],
        shower: "Tors på Kväll + Renbäddning & Sön på dag",
        notes: ""
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


// CREATE TASK
export function createTask(room, time) {

    const taskId = `${room}-${time}`;

    const checked = state.savedTasks[taskId] ? "checked" : "";

    const doneClass = state.savedTasks[taskId] ? "done" : "";

    return `
        <div class="task">

            <input
                type="checkbox"
                data-task-id="${taskId}"
                ${checked}
            />

            <span class="${doneClass}">
                Kl. ${time}
            </span>

        </div>
    `;
}