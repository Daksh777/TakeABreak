const inputElem = document.querySelector('#input-name');
const form = document.querySelector('#form');
const listElem = document.querySelector('#to-do-list');
const buttonElem = document.querySelector('#to-do-list button');

const toDoArray = JSON.parse(localStorage.getItem('to-do-list')) || [];

function updateList(){
  listElem.innerHTML = '';

  for (const key in toDoArray) {
    const li = document.createElement('li');

    const span = document.createElement('span');
    span.innerText = toDoArray[key];

    const button = document.createElement('button');
    button.innerText = 'Delete';
    button.setAttribute('key',key); 
    button.classList.add('delete');

    li.appendChild(span);
    li.appendChild(button);
    listElem.appendChild(li);
  }

  localStorage.setItem('to-do-list',JSON.stringify(toDoArray));
}

function addToList(value){
  if (value === '') return;

  toDoArray.push(value);

  updateList();
  inputElem.value = '';
  inputElem.focus();
}

function deleteFromList(key){

  toDoArray.splice(Number(key),1);

  updateList();
  inputElem.value = '';
  inputElem.focus();
}


form.addEventListener('submit', e => {
  e.preventDefault();
  addToList(inputElem.value);
});

document.addEventListener('click', e => {
  const el = e.target;
  if (el.classList.contains('delete')){ 
    deleteFromList(el.getAttribute('key'));
  }
});

updateList();