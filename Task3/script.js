const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const filters = document.querySelectorAll(".filter");
const taskCount = document.getElementById("taskCount");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

let currentFilter = "all";

renderTasks();

addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keypress", e=>{
    if(e.key==="Enter") addTask();
});

filters.forEach(btn=>{

    btn.addEventListener("click",()=>{

        filters.forEach(b=>b.classList.remove("active"));

        btn.classList.add("active");

        currentFilter = btn.dataset.filter;

        renderTasks();

    });

});

function addTask(){

    const text = taskInput.value.trim();

    if(text==="") return;

    tasks.push({

        id:Date.now(),

        text,

        completed:false

    });

    saveTasks();

    taskInput.value="";

}

function saveTasks(){

    localStorage.setItem("tasks",JSON.stringify(tasks));

    renderTasks();

}

function renderTasks(){

    taskList.innerHTML="";

    let filtered = tasks;

    if(currentFilter==="active"){

        filtered = tasks.filter(task=>!task.completed);

    }

    if(currentFilter==="completed"){

        filtered = tasks.filter(task=>task.completed);

    }

    filtered.forEach(task=>{

        const li=document.createElement("li");

        if(task.completed){

            li.classList.add("completed");

        }

        li.innerHTML=`

        <span>${task.text}</span>

        <div class="actions">

            <button class="complete"

                    data-id="${task.id}">
                ✔
            </button>

            <button class="edit"

                    data-id="${task.id}">
                ✏
            </button>

            <button class="delete"

                    data-id="${task.id}">
                🗑
            </button>

        </div>

        `;

        taskList.appendChild(li);

    });

    updateCounter();

}

taskList.addEventListener("click",(e)=>{

    const id = Number(e.target.dataset.id);

    if(e.target.classList.contains("delete")){

        tasks = tasks.filter(task=>task.id!==id);

        saveTasks();

    }

    if(e.target.classList.contains("complete")){

        const task = tasks.find(task=>task.id===id);

        task.completed=!task.completed;

        saveTasks();

    }

    if(e.target.classList.contains("edit")){

        const task = tasks.find(task=>task.id===id);

        const updated = prompt("Edit Task",task.text);

        if(updated!==null && updated.trim()!==""){

            task.text = updated.trim();

            saveTasks();

        }

    }

});

function updateCounter(){

    const active = tasks.filter(task=>!task.completed).length;

    taskCount.textContent = `${active} task(s) remaining`;

}