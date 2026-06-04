import { state, saveTasks } from "./state.js";

// TOGGLE CHECKBOX
export function toggleTask(taskId, checkbox) {

    state.savedTasks[taskId] = checkbox.checked;

    saveTasks();

    const span = checkbox.nextElementSibling;

    if (checkbox.checked) {
        span.classList.add("done");
    } else {
        span.classList.remove("done");
    }

    showMessage();
}

// SAVE MESSAGE
export function showMessage() {

    const message = document.getElementById("message");

    message.innerText = "Saved successfully";

    setTimeout(() => {
        message.innerText = "";
    }, 2000);
}