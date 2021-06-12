// adding date to the app
const dateElement = document.getElementById('date');
const today = new Date();
const options = {
  weekday: 'long',
  month: 'short',
  day: 'numeric',
};
dateElement.innerHTML = `${today.toLocaleDateString('en-US', options)}`;

// creating list data base
let id = 0;
const storedTaskList = [
  {
    taskName: 'Drink Coffee',
    taskId: id,
    taskDone: false,
    taskInTrash: false,
  },
];

// storing the list in the data base
localStorage.setItem('storedTaskList', JSON.stringify(storedTaskList));

// adding to do to the list

const todoList = document.getElementById('todo-list');
const check = 'far fa-check-circle';
const uncheck = 'fas fa-check-circle';
const done = 'line-through';

const addToDo = (todo, id) => {
  const text = `<li class="item">
          <i class="co ${check}" job="complete" id="${id}"></i>
          <p class="text">${todo}</p>
          <i class="de far fa-trash-alt" job="delete" id="${id}"></i>
        </li>`;
  position = 'beforeend';

  todoList.insertAdjacentHTML(position, text);
};

// adding functionality in the plus button to add the todo item in the list
const inputElement = document.getElementById('input');

document.addEventListener('keyup', e => {
  if (e.keyCode == 13) {
    const todo = inputElement.value;
    if (1) {
      addToDo(todo, id, false);
      storedTaskList.push({
        taskName: todo,
        taskId: id,
        taskDone: false,
        taskInTrash: false,
      });
    }
    inputElement.value = '';
    id++;
  }
});

// complete todo
const toggleCompleteTodo = element => {
  element.classList.toggle(check);
  element.classList.toggle(uncheck);

  element.parentNode.querySelector('.text').classList.toggle(done);
};

// call complete todo
window.addEventListener('click', e => {
  let element = e.target;
  const elementJob = element.attribute.job.value;
  if (elementJob == 'complete') {
    toggleCompleteTodo(element);
  }
});

// display stored todo
