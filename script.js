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
const id = 0;
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

const addToDo =
  (todo,
  id => {
    const text = `<li class="item">
          <i class="co ${check}" jobs="complete" id="${id}"></i>
          <p class="text">${todo}</p>
          <i class="de far fa-trash-alt" jobs="delete" id="${id}"></i>
        </li>`;
    position = 'beforeend';

    todoList.insertAdjacentHTML(position, text);
  });

// adding functionality in the plus button to add the todo item in the list
const inputElement = document.getElementById('input');
console.log(inputElement);
console.log('ji');

document.addEventListener('keyup', e => {
  console.log(e);
  if (e.keyCode === 13) {
    const todo = inputElement.value;
    if (1) {
      addToDo(todo, id);
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

document.addEventListener('click', e => {
  e.target.classList.toggle(check);
  e.target.classList.toggle(uncheck);
});
