const BASE_JSON_BIN_URL = "https://api.jsonbin.io/v3/b";
const BIN_ID = "68e2608543b1c97be95b0d9f";
const MASTER_KEY = "$2a$10$FtZwDp60AwMNrxoSdZxOmOAgdjdGe3V0evGt3.TicBHyJGltXc1vK";


let todos = [];

function addTodo(todos, taskname, urgency, duedate) {
    let newTodo = {
        id: Math.floor(Math.random() * 100 + 1),
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

async function loadTasks() {
  const response = await axios.get(BASE_JSON_BIN_URL + "/" + BIN_ID + "/latest");
  console.log(response.data);
  return response.data.record;
}

async function saveTasks(todos) {
  const response = await axios.put(`${BASE_JSON_BIN_URL}/${BIN_ID}`, todos, {
    headers: {
      "Content-Type": "application/json",
      "X-Master-Key": MASTER_KEY
    }
  });
  return response.data;

}
