let id, storedTaskList;
const check = 'fa-check-circle',
  uncheck = 'fa-circle',
  done = 'line-through',
  today = new Date(),
  options = {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  };
const dateElement = document.getElementById('date'),
  todoList = document.getElementById('todo-list'),
  inputElement = document.getElementById('input'),
  plusButton = document.querySelector('.add-to-do i'),
  refreshButton = document.querySelector('.refresh-todo');

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
    addToDo(item.taskName, item.taskId, item.taskDone);
  });
}

function updateLocalStorage() {
  localStorage.setItem('TODO', JSON.stringify(storedTaskList));
}

function addToDo(todo, id, isDone) {
  const text = `<li class="item">
          <i class="co far ${
            isDone ? check : uncheck
          }" job="complete" id="${id}"></i>
          <p class="text ${isDone ? done : ''}">${todo}</p>
          <i class="de far fa-trash-alt" job="delete" id="${id}"></i>
        </li>`;
  position = 'beforeend';

  todoList.insertAdjacentHTML(position, text);
  updateLocalStorage();
  console.log(storedTaskList.length);
}

const toggleCompleteTodo = element => {
  element.classList.toggle(check);
  element.classList.toggle(uncheck);
  element.parentNode.querySelector('.text').classList.toggle(done);
  storedTaskList[element.id].taskDone = true;
  updateLocalStorage();
};

const removeTodo = element => {
  element.parentNode.parentNode.removeChild(element.parentNode);
  storedTaskList = storedTaskList.filter(item => element.id == item.taskId);
  updateLocalStorage();
};

inputElement.addEventListener('keyup', e => {
  if (e.keyCode == 13) {
    const todo = inputElement.value;
    if (todo) {
      storedTaskList.push({
        taskName: todo,
        taskId: id,
        taskDone: false,
      });
      addToDo(todo, id);
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
