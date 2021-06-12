let id;
let storedTaskList;
const check = 'fa-check-circle';
const uncheck = 'fa-circle';
const done = 'line-through';
const today = new Date();
const options = {
  weekday: 'long',
  month: 'short',
  day: 'numeric',
};
const dateElement = document.getElementById('date');
const todoList = document.getElementById('todo-list');
const inputElement = document.getElementById('input');
const plusButton = document.querySelector('.add-to-do i');
const refreshButton = document.querySelector('.refresh-todo');

checkData();

dateElement.innerHTML = `${today.toLocaleDateString('en-US', options)}`;

function checkData() {
  let data = localStorage.getItem('TODO');
  if (data) {
    storedTaskList = JSON.parse(data);
    loadTodo(storedTaskList);
    id = storedTaskList.length;
  } else {
    storedTaskList = [];
    id = 0;
  }
}

function loadTodo(list) {
  list.map(item => {
    addToDo(item.taskName, item.taskId);
  });
}

function addToDo(todo, id) {
  const text = `<li class="item">
          <i class="co far ${uncheck}" job="complete" id="${id}"></i>
          <p class="text">${todo}</p>
          <i class="de far fa-trash-alt" job="delete" id="${id}"></i>
        </li>`;
  position = 'beforeend';

  todoList.insertAdjacentHTML(position, text);
  localStorage.setItem('TODO', JSON.stringify(storedTaskList));
}

const toggleCompleteTodo = element => {
  element.classList.toggle(check);
  element.classList.toggle(uncheck);
  element.parentNode.querySelector('.text').classList.toggle(done);
  storedTaskList[element.id].taskDone = true;
};

const removeTodo = element => {
  element.parentNode.parentNode.removeChild(element.parentNode);
  storedTaskList = storedTaskList.filter(item => element.id == item.taskId);
  console.log(storedTaskList);
  localStorage.setItem('TODO', JSON.stringify(storedTaskList));
};

// -----eventListeners-----

inputElement.addEventListener('keyup', e => {
  if (e.keyCode == 13) {
    const todo = inputElement.value;
    if (todo) {
      addToDo(todo, id);
      storedTaskList.push({
        taskName: todo,
        taskId: id,
        taskDone: false,
      });
    }
    inputElement.value = '';
    id++;
  }
});

todoList.addEventListener('click', e => {
  const element = e.target;
  const elementJob = element.attributes.job;
  if (elementJob) {
    if (elementJob.value == 'complete') {
      toggleCompleteTodo(element);
    }
    if (elementJob.value == 'delete') {
      removeTodo(element);
    }
  }
});

refreshButton.addEventListener('click', e => {
  localStorage.clear();
  location.reload();
});

plusButton.addEventListener('click', e => {
  const todo = inputElement.value;
  if (todo) {
    addToDo(todo, id);
    storedTaskList.push({
      taskName: todo,
      taskId: id,
      taskDone: false,
    });
    inputElement.value = '';
    id++;
  }
});
