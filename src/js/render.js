console.log("render.js stated");

import { residents, createTask } from "./app.js";
import { toggleTask } from "./tasks.js";
import { loadSavedTasks } from "./state.js";
import { currentUser } from "./auth.js";

const schedule = document.getElementById("schedule");
if (!schedule) throw new Error("#schedule element not found");

const editorStorageKey = "medicin-list-editor";

const baseColumns = [
    { key: "room", label: "Lgh", type: "text", width: "100px", addable: false },
    { key: "morning", label: "Morgon", type: "tasks", width: "120px", addable: true },
    { key: "lunch", label: "Lunch", type: "tasks", width: "120px", addable: true },
    { key: "dinner", label: "Middag", type: "tasks", width: "120px", addable: true },
    { key: "evening", label: "Kväll", type: "tasks", width: "120px", addable: true },
    { key: "shower", label: "Dusch", type: "text", width: "150px", addable: false },
    { key: "notes", label: "Överigt", type: "text", width: "200px", addable: false }
];

function escapeHtml(value) {
    return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function cloneRows(sourceRows) {
    return sourceRows.map(person => ({
        room: person.room ?? "",
        morning: [...(person.morning ?? [])],
        lunch: [...(person.lunch ?? [])],
        dinner: [...(person.dinner ?? [])],
        evening: [...(person.evening ?? [])],
        shower: person.shower ?? "",
        notes: person.notes ?? "",
        extra: person.extra ?? {}
    }));
}

function loadEditorState() {
    const fallback = {
        rows: cloneRows(residents),
        extraColumns: []
    };

    try {
        const raw = localStorage.getItem(editorStorageKey);
        if (!raw) {
            return fallback;
        }

        const parsed = JSON.parse(raw);
        return {
            rows: Array.isArray(parsed.rows) ? parsed.rows : fallback.rows,
            extraColumns: Array.isArray(parsed.extraColumns) ? parsed.extraColumns : fallback.extraColumns
        };
    } catch {
        return fallback;
    }
}

const editorState = loadEditorState();

// load persisted state before rendering
loadSavedTasks();

function saveEditorState() {
    localStorage.setItem(editorStorageKey, JSON.stringify(editorState));
}

function getColumns() {
    const columns = [...baseColumns];

    editorState.extraColumns.forEach(extraColumn => {
        const anchorIndex = columns.findIndex(column => column.key === extraColumn.afterKey);
        const insertIndex = anchorIndex >= 0 ? anchorIndex + 1 : columns.length;
        columns.splice(insertIndex, 0, extraColumn);
    });

    return columns;
}

function getGridTemplate(columns) {
    return columns.map(column => column.width || "120px").join(" ");
}

function addColumn(afterKey) {

    if (currentUser.role !== "admin") {
        alert("Only administrators can add columns");
        return;
    }

    const nextColumns = [...editorState.extraColumns];

    const nextNumber = nextColumns.length + 1;

    const newColumn = {
        key: `extra-${Date.now()}-${nextNumber}`,
        label: prompt("Medication time?") || `Extra ${nextNumber}`,
        type: "text",
        width: "180px",
        addable: false,
        afterKey
    };

    nextColumns.push(newColumn);

    editorState.extraColumns = nextColumns;

    editorState.rows = editorState.rows.map(row => ({
        ...row,
        extra: {
            ...(row.extra || {}),
            [newColumn.key]: ""
        }
    }));
    
    saveEditorState();
    render();
}

function updateField(rowIndex, field, value) {
    editorState.rows[rowIndex][field] = value;
    saveEditorState();
}

function updateExtraField(rowIndex, columnKey, value) {
    editorState.rows[rowIndex].extra = {
        ...(editorState.rows[rowIndex].extra || {}),
        [columnKey]: value
    };
    saveEditorState();
}

function renderHeader(columns) {
    return columns.map(column => {
        const button =
            currentUser.role === "admin" && column.addable
        ? `
            <button 
                class="mini-btn"
                data-action="add-column" 
                data-after-key="${column.key}"
            >
                +
            </button>
        `
        : "";

        return `
            <div class="header ${column.key}">
                <span>${escapeHtml(column.label)}</span>
                ${button}
            </div>
        `;
    }).join("");
}

function renderTextCell(value, rowIndex, field) {

    const disabled = 
        currentUser.role === "staff"
            ? "disabled"
            : "";

    return `
        <div class="cell">
            <input 
                class="text-input"
                type="text"
                value="${escapeHtml(value)}"
                data-row-index="${rowIndex}"
                data-field="${field}"
                ${disabled}
            />
        </div>
    `;
}

function renderNotesCell(value, rowIndex) {
    return `
        <div class="cell">
            <textarea
                class="notes-input"
                data-row-index="${rowIndex}"
                data-field="notes"
            >${escapeHtml(value)}</textarea>
        </div>
    `
}

function renderExtraCell(value, rowIndex, columnKey) {

    const disabled = 
        currentUser.role === "staff"
            ? "disabled"
            : "";

    return `
        <div class="cell">
            <input
                class="text-input"
                type="text"
                value="${escapeHtml(value)}"
                data-row-index="${rowIndex}"
                data-extra-key="${columnKey}"
                ${disabled}
            />
        </div>
    `;
}

function renderRow(row, rowIndex, columns) {
    const taskColumns = ["morning", "lunch", "dinner", "evening"];

    const cells = columns.map(column => {
        if (column.key === "room" || column.key === "shower") {
            return renderTextCell(
                row[column.key] ?? "", 
                rowIndex, 
                column.key
            );
        }

        if (column.key === "notes") {
            return renderNotesCell(
                row.notes ?? "",
                rowIndex
            );
        }

        if (taskColumns.includes(column.key)) {
            return `
                <div class="cell">
                    ${(row[column.key] ?? []).map(time => createTask(row.room || `row-${rowIndex}`, time)).join("")}
                </div>
            `;
        }

        if (column.type === "text") {
            return renderExtraCell((row.extra || {}) [column.key] ?? "", rowIndex, column.key);
        }

        return `<div class="cell"></div>`;
    });

    return cells.join("");
}

function render() {
    const columns = getColumns();
    schedule.style.gridTemplateColumns = getGridTemplate(columns);

    schedule.innerHTML = [
        renderHeader(columns),
        ...editorState.rows.map((row, rowIndex) =>
        renderRow(row, rowIndex, columns)
        )
    ].join("");

    schedule.querySelectorAll('input[data-field]').forEach(input => {
        input.addEventListener("input", () => {
            const rowIndex = Number(input.dataset.rowIndex);
            const field = input.dataset.field;
            updateField(rowIndex, field, input.value);
        });
    });

    schedule.querySelectorAll('input[data-extra-key]').forEach(input => {
        input.addEventListener("input", () => {
            const rowIndex = Number(input.dataset.rowIndex);
            const columnKey = input.dataset.extraKey;
            updateExtraField(rowIndex, columnKey, input.value);
        });
    });

    schedule.querySelectorAll('.task input[type="checkbox"]').forEach(input => {
        input.addEventListener("change", () => {
            const id = input.dataset.taskId;
            toggleTask(id, input);
        });
    });

    schedule.querySelectorAll('[data-action="add-column"]').forEach(button => {
        button.addEventListener("click", () => {
            addColumn(button.dataset.afterKey);
        });
    });
}

console.log("About to render");

try {
    render();
    console.log("Render success");
} catch (err) {
    console.error("Render error:", err);
}
