document.getElementById("clear-button").onclick = clearAllTasks;
document.getElementById("add-button").onclick = addNewTask;
document.getElementById("filter").oninput = filterTasks;

let tasks;
if (localStorage.getItem("newtasks")) {
    tasks = JSON.parse(localStorage.getItem("newtasks"));
} else {
    tasks = [];
}

function refreshTasks(allTasks) {
    clearViewTasks();
    printAllTasks(allTasks);
    localStorage.setItem("newtasks", JSON.stringify(allTasks));

}

let input1 = document.getElementById("new-task");
let input2 = document.getElementById("priority");
input1.addEventListener("keyup", function (event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        document.getElementById("add-button").click();
    }
});
input2.addEventListener("keyup", function (event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        document.getElementById("add-button").click();
    }
});

///view

function printAllTasks(allTasks) {
    allTasks.sort(function (a, b) {
        return a.priority > b.priority;
    });
    let ul = document.getElementById("printed-list");
    for (let i = 0; i < allTasks.length; i++) {
        let li = document.createElement("li");
        let spanPriority = document.createElement("span");
        spanPriority.innerHTML = allTasks[i].priority;
        spanPriority.className = "priority";
        li.appendChild(spanPriority);
        let spanName = document.createElement("span");
        spanName.innerHTML = allTasks[i].name;
        spanName.className = "name";
        li.appendChild(spanName);
        let icon = document.createElement("i");
        icon.onclick = clearOneByOne;
        let closeIcon = "fas fa-times";
        icon.className = closeIcon;
        li.appendChild(icon);
        ul.appendChild(li);
    }
}

function clearViewTasks() {
    let ul = document.querySelector('#printed-list');
    let listLength = ul.children.length;
    for (let i = 0; i < listLength; i++) {
        ul.removeChild(ul.children[0]);
    }
}

printAllTasks(tasks);

function addNewTask() {
    let getValue = document.getElementById("new-task").value;
    let getPriorityValue = document.getElementById("priority").value;
    if (!getValue && !getPriorityValue) {
        return;
    }

    let newtask = {
        name: getValue,
        priority: getPriorityValue
    }
    tasks.push(newtask);

    document.getElementById("new-task").value = "";
    document.getElementById("priority").value = "";

    refreshTasks(tasks);
}

//Controler
function clearAllTasks() {
    if (confirm("Do you really want to delete this?")) {
        //  clearViewTasks();
        tasks = [];
        refreshTasks(tasks);
    }
}

function clearOneByOne() {
    if (confirm("Do you really want to delete this?")) {
        let taskName = this.parentNode.children[1].innerHTML;
        for (let i = 0; i < tasks.length; i++) {
            if (tasks[i].name === taskName) {
                tasks.splice(i, 1);
                break;
            }
        }
        refreshTasks(tasks);
    }
}

function filterTasks() {
    let getWantedTasks = document.getElementById("filter").value.toLowerCase();
    let filteredTasks = [];
    for (let i = 0; i < tasks.length; i++) {
        let isFiltered = tasks[i].name.toLowerCase().includes(getWantedTasks);
        if (isFiltered) {
            filteredTasks.push(tasks[i]);
        }
    }
    refreshTasks(filteredTasks);
}

