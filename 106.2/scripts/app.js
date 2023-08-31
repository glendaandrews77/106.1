var notImportantIcon = "fa-regular fa-bookmark";
var importantIcon = "fa-solid fa-bookmark";
let isImportant = false;
let isVisible = true;

function toggleImportant() {
    isImportant = !isImportant;
    updateIcon();
}

function updateIcon() {
    $("#formIcon").removeClass(importantIcon).removeClass(notImportantIcon);
    if (isImportant) {
        $("#formIcon").addClass(importantIcon);
    } else {
        $("#formIcon").addClass(notImportantIcon);
    }
}

function toggleView() {
    isVisible = !isVisible;
    if (isVisible) {
        $("#form").show();
    } else {
        $("#form").hide();
    }
}

function saveTask() {
    let title = $("#txtText").val();
    let desc = $("#txtDescription").val();
    let category = $("#selCategory").val();
    let dueDate = $("#selDueDate").val();
    let priority = $("#selPriority").val();

    let task = {
        isImportant: isImportant,
        title: title,
        description: desc,
        category: category,
        dueDate: dueDate,
        priority: priority
    };

    $.ajax({
        type: 'POST',
        url: "https://fsdiapi.azurewebsites.net/api/tasks/",
        data: JSON.stringify(task),
        contentType: 'application/json',
        success: function(res) {
            console.log(res);
        },
        error: function(error){
            console.error(error);
        }
    });
}

function displayTask(task) {
    let icon = task.isImportant
        ? `<i class="important-task ${importantIcon}"></i>`
        : `<i class="regular-task ${notImportantIcon}"></i>`;

    let syntax = `
        <div class="task" style="border: 2px solid ${task.priority.toLowerCase()}">
            <div class="info">
                <h5>${task.title}</h5>
                <p>${task.description}</p>
            </div>
        </div>
    `;
    $("#pending-task").append(syntax);
}

function loadTasks() {
    $.ajax({
        type: "GET",
        url: "https://fsdiapi.azurewebsites.net/api/tasks",
        success: function (res) {
            let data = res; // No need to parse JSON, as jQuery handles it
            for (let task of data) {
                displayTask(task);
            }
        },
        error: function (error) {
            console.log(error);
            alert("Unexpected error");
        }
    });
}

function init() {
    loadTasks();
    $("#toggleView").click(toggleView);
    $("#formIcon").click(toggleImportant);
}

$(document).ready(function() {
    init();
});
