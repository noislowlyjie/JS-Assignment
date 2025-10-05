let todos = [];
let index = 0;

function addTodo(todos, taskname, urgency, duedate) {
    let newTodo = {
        id: index++,
        name: taskname,
        importance: urgency,
        dueDate: duedate
    };
    // todos is the array, push is the action, newTodo is the item to add into the array called todos
    todos.push(newTodo);
}

function modifyTask(todos, id, newTaskName, newUrgency, newDueDate) {
  let task = null;
  for (let t of todos) {
    if (t.id == id) {
      task = t;
    }
  }
  if (task) {
    task.name = newTaskName;
    task.importance = newUrgency;
    task.dueDate = newDueDate;
  } else {
    console.log("Task is not found");
  }
}

function deleteTask(todos, id) {
  // find the index of the task to delete
  let indexToDelete = null;
  for (let i = 0; i < todos.length; i++) {
    if (todos[i].id == id) {
      indexToDelete = i;
      break;
    }
  }
  if (indexToDelete !== null) {
    todos.splice(indexToDelete, 1);
  } else {
    console.log("Task is not found");
  }
}