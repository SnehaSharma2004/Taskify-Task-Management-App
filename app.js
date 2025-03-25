document.addEventListener('DOMContentLoaded', ()=>{
    const storedTasks = JSON.parse(localStorage.getItem('tasks')); /* fetching stored data from local storage */

    if(storedTasks){
        storedTasks.forEach((task) => tasks.push(task));
        updateTasksList();
        updateStats();
    }
});

let tasks=[];

const saveTasks = ()=>{
    localStorage.setItem('tasks',JSON.stringify(tasks)); /* store in local storage using tasks key */
};

/* function to add the task in the array */

const addTask = ()=>{
    const taskInput = document.getElementById('taskInput');
    const text = taskInput.value.trim();

    if(text){
        tasks.push({text:text, completed:false});
        
        updateTasksList();
        updateStats();
        saveTasks();
    }
};

/* function to create, delete and toggle task */

const toggleTaskComplete = (index) =>{
    tasks[index].completed = !tasks[index].completed;
    console.log({tasks}); /* true: if task completed, fase: not completed */
    updateTasksList(); 
    updateStats();
    saveTasks();
};
/* delete and edit function not working */
const deleteTask = (index) =>{
    tasks.splice(index, 1); /* the splice() method is used to add, remove or replace elements in an array */
    updateTasksList();
    updateStats();
    saveTasks();
};

const editTask = (index) =>{
    const taskInput = document.getElementById('taskInput');
    task.value= tasks[index].text;
    tasks.splice(index,1);
    updateTasksList();
    updateStats();
    saveTasks();
};

/* function to update stats */
const updateStats = ()=>{
    const completeTasks = tasks.filter(task => task.completed).length;
    const totalTasks = tasks.length;
    const progress = (completeTasks/totalTasks) * 100;

    const progressBar = document.getElementById('progress');
    progressBar.style.width = `${progress}%`;

    document.getElementById('numbers').innerText = `${
        completeTasks} / ${totalTasks}`;

    if(tasks.length && completeTasks == totalTasks){
        confetti();
    }
};


/* function to update the task list on UI */

const updateTasksList = ()=>{
    const taskList = document.getElementById('task-list');

    /* the input bar is not refreshing after adding the task */
    taskList.innerHTML = ''; /* any list that is being rendered will be deleted */

    tasks.forEach((task, index) =>{
        const listItem = document.createElement('li');
        listItem.innerHTML = `
        <div class="taskItem">
            <div class="task ${task.completed ? 'completed':''}">
                <input type="checkbox" class="checkbox" ${task.completed ? 'checked':''}/>
                <p>${task.text}</p>
            </div>
            <div class="icons">
                <i class="fas fa-edit" aria-hidden="true" onclick="editTask(${index})"></i>
                <i class="fas fa-trash" aria-hidden="true" onclick="deleteTask(${index})"></i>
            </div>
        </div>
        `;

        listItem.addEventListener('change', ()=> toggleTaskComplete(index));
        taskList.append(listItem);
    });
};

document.getElementById('newTask').addEventListener('click',function(e){
    e.preventDefault(); /* to prevent reloading the page */

    addTask();
});

/* https://confetti.js.org/more.html */

const confetti = () => {
  const count = 200,
    defaults = {
      origin: { y: 0.7 },
    };

  function fire(particleRatio, opts) {
    confetti(
      Object.assign({}, defaults, opts, {
        particleCount: Math.floor(count * particleRatio),
      })
    );
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
  });

  fire(0.2, {
    spread: 60,
  });

  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
  });

  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
  });

  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });
};