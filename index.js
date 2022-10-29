const Task = (props) => {
    const {name, due, done} = props;
    if (done) {
      return `
    <div class="task">
        <div class="task__body">
          <div class="task__name">${name}</div>
          <div class="task__due">${due}</div>
        </div>
        <div class="task__done">✓</div>
      </div>
    `
    }
    else {
      return `
    <div class="task">
        <div class="task__body">
          <div class="task__name">${name}</div>
          <div class="task__due">${due}</div>
        </div>
        <div class="task__done"></div>
      </div>
    `
    }
};


const renderTasks = (tasks) => {
    const tasksList = document.querySelector(".todo__tasks");
    tasksList.innerHTML = tasks
    .map((task) => (Task(task)))
    .join("");
};


fetch('https://apps.kodim.cz/daweb/trening-api/apis/tasks-api/tasks')
    .then((response) => response.json())
    .then((data) => {
        renderTasks(data)
    });


const filterTasks = document.querySelector('#checkbox-undone');


filterTasks.addEventListener('change', (e) => {
 // e.preventDefault();
  const isChecked = e.target.checked;
  if (isChecked) {
    fetch(
    `https://apps.kodim.cz/daweb/trening-api/apis/tasks-api/tasks?done=false`,
    )
    .then((response) => {
      return response.json();
    })
    .then(renderTasks);
  } else {
    fetch('https://apps.kodim.cz/daweb/trening-api/apis/tasks-api/tasks')
    .then((response) => response.json())
    .then((data) => {
        renderTasks(data)
    });
  }
  
});