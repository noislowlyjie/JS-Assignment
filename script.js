document.addEventListener("DOMContentLoaded", function() {

  
    async function main() {
      // Application state

      let todos = await loadTasks();

      // UI elements
      const addTodoButton = document.querySelector("#addTodo");
      addTodoButton.addEventListener('click', function() {
        const taskNameInput = document.querySelector("#taskName")
        const taskName = taskNameInput.value;

        const taskUrgencySelect = document.querySelector("#taskUrgency");
        const taskUrgency = taskUrgencySelect.value;

        const taskDueDateInput = document.querySelector("#taskDueDate");
        const taskDueDate = taskDueDateInput.value;

        if (taskName) {
          addTodo(todos, taskName, taskUrgency, taskDueDate);
          renderTodos(todos);
          taskNameInput.value = '';
          taskUrgencySelect.value ='';
          taskDueDateInput.value = '';
        }
        else{
          alert("Please enter a task name:");
        }
      });
    }

    main();

    function renderTodos(todos) {
      const todoList = document.querySelector("#todoList");
      todoList.innerHTML = '';

      for (let todo of todos) { 
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        li.innerHTML = `
                <span style="width:40%">${todo.name}</span><span style="width:20%">${todo.dueDate}</span><span class="badge bg-primary" style="width:10%">${todo.importance}</span>
                <button class="btn edit-btn btn-success btn-sm">Edit</button>
                <button class="btn delete-btn btn-danger btn-sm">Delete</button>               
            `;
        todoList.appendChild(li);

        li.querySelector(".edit-btn").addEventListener('click', function() {
          const newTaskName = prompt("Enter the new task name: ", todo.name);
          const newUrgency = prompt("Enter the new urgency:", todo.importance);
          const newDueDate = prompt("Enter the new due date:", todo.dueDate);
          modifyTask(todos, todo.id, newTaskName, newUrgency, newDueDate);
          renderTodos(todos);
        });

        li.querySelector(".delete-btn").addEventListener('click', function() {
          const confirmation = confirm("Do you want to delete the task: " + todo.name + "?");
          if (confirmation) {
            deleteTask(todos, todo.id);
            renderTodos(todos);
          }
        });

        const saveButton = document.querySelector("#save-btn");
          saveButton.addEventListener("click", async function() {
          await saveTasks(todos);
        });

    }
  }

  renderTodos(todos);
  
});
