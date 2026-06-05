// Shared state and persistence
export const state = {
    savedTasks: JSON.parse(localStorage.getItem("completedTasks")) || {}
};

export function loadSavedTasks() {
    state.savedTasks = JSON.parse(localStorage.getItem("completedTasks")) || {};
}

export function saveTasks() {
    localStorage.setItem("completedTasks", JSON.stringify(state.savedTasks));
}