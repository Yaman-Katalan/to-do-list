"use strict";
//
let theInput = document.querySelector(".to-do .input input");
console.log(theInput);
//
let addBtn = document.querySelector(".to-do .input .options button.add");
console.log(addBtn);
//
let tasks = document.querySelector(".to-do .tasks");
//
let deleteAll = document.querySelector(".to-do .input .options button.delete");
console.log(deleteAll);
//
let taskArray = [];
let localArray = [];
//
deleteAll.onclick = function () {
  window.localStorage.removeItem("myTasks");
  tasks.innerHTML = "";
};
//
addBtn.onclick = function () {
  if (theInput.value != "") {
    let taskID = Date.now();
    creator(theInput.value, taskID);
    //
    localArray.push({ id: taskID, text: theInput.value, completed: false });
    console.log(localArray);
    window.localStorage.setItem("myTasks", JSON.stringify(localArray));
    //
    getTasks();
    // console.log(taskArray);
    deleteTask();
    //
    theInput.value = "";
  }
};

// Function: Creator >->->
function creator(text, id) {
  // Create taskDiv Element
  let task = document.createElement("div");
  task.className = "task";
  // task.id = `${Date.now()}`;
  task.id = id;
  // Task Span
  let taskSpan = document.createElement("span");
  taskSpan.textContent = text;
  task.appendChild(taskSpan);
  // Delete Button
  let deleteBtn = document.createElement("button");
  deleteBtn.textContent = "delete";
  task.appendChild(deleteBtn);
  //
  tasks.appendChild(task);
  //
}

// Function: Array From tasks DIV
function getTasks() {
  taskArray = document.querySelectorAll(".to-do .tasks .task");
  doneClass();
}

// Function: add/remove done class to elements
function doneClass() {
  taskArray.forEach((task) => {
    task.onclick = (e) => {
      //   console.log(e.currentTarget);
      e.currentTarget.classList.toggle("done");
      localArray.forEach((ele) => {
        if (ele.id == e.currentTarget.id) {
          ele.completed ? (ele.completed = false) : (ele.completed = true);
        }
      });
      window.localStorage.myTasks = JSON.stringify(localArray);
    };
  });
}

// Function: Change (completed) in local storage

// Function: Update Local Storage:
function localUpdate(theID) {
  localArray = localArray.filter((el) => {
    return el.id != theID;
  });

  window.localStorage.myTasks = JSON.stringify(localArray);
}

// Function: delete task
function deleteTask() {
  let delbtns = document.querySelectorAll(".to-do .tasks .task button");
  //
  delbtns.forEach((btn) => {
    btn.onclick = function () {
      localUpdate(btn.parentElement.id);
      btn.parentElement.remove();
      getTasks();
      console.log(taskArray);
    };
  });
}

//
if (document.querySelectorAll(".to-do .tasks .task").length > 0) {
  getTasks();
  deleteTask();
}

if (window.localStorage.myTasks) {
  localArray = JSON.parse(window.localStorage.myTasks);
  //
  JSON.parse(window.localStorage.myTasks).forEach((obj) => {
    creator(obj.text, obj.id);
    //
    getTasks();
    // console.log(taskArray);
    deleteTask();
  });
}
