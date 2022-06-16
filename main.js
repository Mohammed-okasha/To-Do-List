// [To Do List Project]
// Access To Items

let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let tasksDiv = document.querySelector(".tasks");

// Empty Array To Store The Tasks
let arrayOfTasks = [];

// Check If there is Tasks In Local Storage
// Local Storage داخل ال arrayOfTasks الى tasks ضفت ال
//arrayOfTasks لل localStorage.getItem(tasks) فاضيه بيقوم ضايف ال arrayOfTasks مترجم اللغه لو لقى ال
if (localStorage.getItem("tasks")) {
    arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
};

// Step [1] , Add Task
submit.onclick = function() {
    // Check Input Value != "" ?
    if (input.value != "") {
        // Call Add Task To Array Function
        addTaskToArray(input.value);

        // Empty input Field After User Set Value
        input.value = "";
    }
}


// Click On Task Element And Aceess To Delete btn
tasksDiv.addEventListener("click", (e) => {
    // Delete Button
    if(e.target.classList.contains("delete")) {

        // Call Remove Task From Local Storage Function
        // Get Id Attribute From Delete Btn Child(task)
        removeTaskWith(e.target.parentElement.getAttribute("data-id"));

        // Remove Task From Page
        e.target.parentElement.remove();
    };

    // Check Task Element ===========
    if (e.target.classList.contains("task")) {
        // Toggle Compleated
        toggleStatusTaskWith(e.target.getAttribute("data-id"));

        // Toggle Done Class
        e.target.classList.toggle("done");
    };
});


// Step [2] Add Task To Array Of Tasks Function
function addTaskToArray(taskText) {
// taskText pram > input بيجي من القيمه اللي الشخص بيكتبها في ال

    // Task Data
    const task = {
        id: Date.now(), // Task يظهر تاريخ اضافة ال
        title: taskText,
        completed: false,
    };

    // Push Task To Array Of Tasks
    arrayOfTasks.push(task);

    // Call Add Elements To Page Function
    addElementsToPageFrom(arrayOfTasks);

    // Call Add Data(tasks) To localstorage Function
    addDataToLocalStorageFrom(arrayOfTasks);
};


// Step [3] Add Elements To Page Function
function addElementsToPageFrom(arrayOfTasks) {
    // Empty Tasks Div
    tasksDiv.innerHTML = "";

    // Looping On Array Of Tasks
    arrayOfTasks.forEach((task) => {
        // Ctrate Task Div
        let div = document.createElement("div");
        div.className = "task";
        div.setAttribute("data-id", task.id);

        // Check IF Task is Done
        if (task.completed) {
            div.className = "task done";
        };

        // Create Text Node And Append task.title To Div
        div.appendChild(document.createTextNode(task.title));

        // Create Delete Task btn
        let deleteBtn = document.createElement("span");
        deleteBtn.classList = "delete";
        deleteBtn.innerText = "Delete";
        // Append deleteBtn To Div
        div.appendChild(deleteBtn);

        // append Task Div To Tasks Div
        tasksDiv.appendChild(div);
    });
};


// Step [4] Add Data To localStorage Function
function addDataToLocalStorageFrom(arrayOfTasks) {
    // Convert Array Of Tasks From js Object To JSON Object
    window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));

}


// Step [5] Get Data From LcoalStorage Function
function getDataFromLacoaStorage() {
    let data = window.localStorage.getItem("tasks");
    if (data) {
        // Convert Array Of Tasks From JSON Object To js Object
        let tasks = JSON.parse(data);

        // Call addElementsToPageFrom Function And Pass Parm > tasks
        addElementsToPageFrom(tasks);
    }
};
getDataFromLacoaStorage();


// Step [6] Remove Task From Local Storage Function
function removeTaskWith(taskId) {
    // For Explain Only
    // for (let i = 0; i < arrayOfTasks.length; i++) {
    //     let task = arrayOfTasks[i];
    //     console.log(`${task.id} ====== ${taskId}`);
    // }

    // Filtering arrayOfTasks
    arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);

    // Calling Fun And Add Update arrayOfTasks To Fun After Filtering
    addDataToLocalStorageFrom(arrayOfTasks);
};


// Step [7] Toggle Status Task With ID Function
function toggleStatusTaskWith(taskId) {
    for (let i = 0; i < arrayOfTasks.length; i++) {
        let task = arrayOfTasks[i];

        // Check task.id == taskId ?
        if (task.id == taskId) {
            // Check task.completed == false ?
            task.completed == false ? task.completed = true : task.completed = false;
        };
    };

    // Calling Fun And Add Update arrayOfTasks To Fun After Filtering
    addDataToLocalStorageFrom(arrayOfTasks);
};


// Access To Clear Btn
const clear = document.querySelector(".clear");

clear.onclick = () => {
    // Empty Tasks Div from Taskes
    tasksDiv.innerHTML = "";

    localStorage.clear();
};