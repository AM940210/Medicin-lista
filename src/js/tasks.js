// TOGGLE CHECKBOX
function toggleTask(taskId, checkbox) {

    savedTasks[taskId] = checkbox.checked;

    localStorage.setItem(
        "completedTasks",
        JSON.stringify(savedTasks)
    );

    const span = checkbox.nextElementSibling;

    if (checkbox.checked) {
        span.classList.add("done");
    } else {
        span.classList.remove("done");
    }

    showMessage();
}

// SAVE MESSAGE
function showMessage() {

    const message = document.getElementById("message");

    message.innerText = "Saved successfully";

    setTimeout(() => {
        message.innerText = "";
    }, 2000);
}