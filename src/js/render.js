import { residents, createTask } from "./app.js";
import { toggleTask } from "./tasks.js";
import { loadSavedTasks } from "./state.js";

const schedule = document.getElementById("schedule");

// ensure persisted state is loaded
loadSavedTasks();

// RENDER DATA
residents.forEach(person => {
    schedule.innerHTML += `
        <div class="cell room">
            ${person.room}
        </div>

        <div class="cell">
            ${person.morning.map(time =>
                createTask(person.room, time)
            ).join("")}
        </div>

        <div class="cell">
            ${person.lunch.map(time =>
                createTask(person.room, time)
            ).join("")}
        </div>

        <div class="cell">
            ${person.dinner.map(time =>
                createTask(person.room, time)
            ).join("")}
        </div>

        <div class="cell">
            ${person.evening.map(time =>
                createTask(person.room, time)
            ).join("")}
        </div>

        <div class="cell">
            ${person.shower}
        </div>

        <div class="cell">
            ${person.notes}
        </div>
    `;
})

// attach event listeners to checkboxes (no inline handlers)
document.querySelectorAll('.task input[type=""checkbox]').forEach(input => {
    input.addEventListener('change', (e) => {
        const id = input.dataset.taskId;
        toggleTask(id, input);
    });
});