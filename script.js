var todoInput = document.querySelector("#todo-text");
var todoForm = document.querySelector("#todo-form");
var todoList = document.querySelector("#todo-list");
var todoCountSpan = document.querySelector("#todo-count");

var todos = ["Learn HTML", "Learn CSS"];

function renderTodos() {
  // Clear todoList element and update todoCountSpan
  todoList.innerHTML = "";
  todoCountSpan.textContent = todos.length;

  // Render a new li for each todo
  for (var i = 0; i < todos.length; i++) {
    var todo = todos[i];

    var li = document.createElement("li");
    li.textContent = todo;
    li.setAttribute("data-index", i);
    todoList.appendChild(li);
    var complete = document.createElement("button");
    complete.className = "button";
    complete.innerText = "Complete";
    li.appendChild(complete);
  }


  //When complete button is clicked...
  var completeBtn = document.querySelectorAll("button"),
    result;

  for (var i = 0; i < completeBtn.length; i++) {
    result = completeBtn[i];
    result.addEventListener('click', function (event) {
      event.preventDefault();
      var remove = this.parentNode.dataset.index;
      todos.splice(remove, 1);
      renderTodos();
      storeTodos();
    })
  }

  
  storeTodos();
  renderTodos();
}

// When form is submitted...
todoForm.addEventListener("submit", function (event) {
  event.preventDefault();

  var todoText = todoInput.value.trim();

  // Return from function early if submitted todoText is blank
  if (todoText === "") {
    return;
  }

  // Add new todoText to todos array, clear the input
  todos.push(todoText);
  todoInput.value = "";

  // Re-render the list
  renderTodos();
});

// Set items to local storage
function storeTodos() {
  var stringifyTodos = JSON.stringify(todos);
  localStorage.setItem("todo", stringifyTodos);
}

// Get items from local storage on page load
function init() {
  var storedTodos = localStorage.getItem("todo");
  var parsedTodos = JSON.parse(storedTodos);

  if (parsedTodos == null) {
    return;
  } else {
    todos = parsedTodos;
    
  }
renderTodos();
}

init();

