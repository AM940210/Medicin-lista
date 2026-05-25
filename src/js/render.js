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