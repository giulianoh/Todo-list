const input = document.querySelector("input");
const addBtn = document.querySelector(".btn-add");
const ul = document.querySelector("ul");
const empty = document.querySelector(".empty");

// Obtener la lista de tareas del almacenamiento local al cargar la página
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Mostrar las tareas guardadas al cargar la página
tasks.forEach(task => {
  const li = createTaskElement(task);
  ul.appendChild(li);
});

addBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const text = input.value;

  if (text !== "") {
    const li = createTaskElement(text);
    ul.appendChild(li);
    tasks.push(text);
    saveTasksToLocalStorage();
    
    input.value = "";
    empty.style.display = "none";
  }
});

function createTaskElement(text) {
  const li = document.createElement("li");
  const p = document.createElement("p");
  p.textContent = text;

  li.appendChild(p);
  li.appendChild(addDeleteBtn());
  
  return li;
}

function addDeleteBtn() {
  const deleteBtn = document.createElement("button");

  deleteBtn.textContent = "X";
  deleteBtn.className = "btn-delete";

  deleteBtn.addEventListener("click", (e) => {
    const item = e.target.parentElement;
    ul.removeChild(item);
    const index = tasks.indexOf(item.querySelector("p").textContent);
    tasks.splice(index, 1);
    saveTasksToLocalStorage();

    if (tasks.length === 0) {
      empty.style.display = "block";
    }
  });

  return deleteBtn;
}

function saveTasksToLocalStorage() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
