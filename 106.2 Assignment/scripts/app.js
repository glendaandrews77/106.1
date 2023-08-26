const nonImportantIcon = "fa-regular fa-heart";
const importantIcon = "fa-solid fa-heart";
var isImportant = false;
var isVisible = true;

function toggleImportant() {
    if (isImportant) {
        // To non-important
        $("#topIcon").removeClass(importantIcon);
        $("#topIcon").addClass(nonImportantIcon);
        isImportant = false;
    } else {
        // To important
        $("#topIcon").removeClass(nonImportantIcon);
        $("#topIcon").addClass(importantIcon);
        isImportant = true;
    }
}

function saveTask() {
    console.log("Saving task!");
    let title = $("#txtTitle").val();
    let description = $("#txtDescription").val();
    let dueDate = $("#selDueDate").val(); // Corrected ID
    let category = $("#selCategory").val(); // Corrected ID
    let priority = $("#selPriority").val(); // Corrected ID
    let cost = $("#txtCost").val();

    // Create a new instance of the task (object)
    let task = new Task(isImportant, title, description, dueDate, category, priority, cost);
    console.log(task);
    // Console log the instance (object)
}

function toggleDetails() {
    if (isVisible) {
        $("#secForm").hide();
        isVisible = false;
    } else {
        $("#secForm").show();
        isVisible = true;
    }
}

function init() {
    console.log("Task Manager");

    $("#topIcon").click(toggleImportant);
    $("#btnSave").click(saveTask);
    $("#btnToggleDetails").click(toggleDetails);
}

window.onload = init;
