const input = document.getElementById("taskInput");
const list = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function showTasks() {
    list.innerHTML = "";

    tasks.forEach((task, i) => {
        const li = document.createElement("li");

        li.innerHTML = `
            <input type="checkbox" ${task.done ? "checked" : ""}>
            <span class="${task.done ? "done" : ""}">${task.text}</span>
            <button class="edit">Edit</button>
            <button class="delete">X</button>
        `;

        li.querySelector("input").onchange = () => {
            tasks[i].done = !tasks[i].done;
            save();
        };

        li.querySelector(".edit").onclick = () => {
            let text = prompt("Edit task:", task.text);
            if (text) {
                tasks[i].text = text;
                save();
            }
        };

        li.querySelector(".delete").onclick = () => {
            tasks.splice(i, 1);
            save();
        };

        list.appendChild(li);
    });

    total.textContent = tasks.length;
    done.textContent = tasks.filter(t => t.done).length;
    pending.textContent = tasks.filter(t => !t.done).length;
}

function save() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    showTasks();
}

addBtn.onclick = () => {
    if (input.value.trim()) {
        tasks.push({
            text: input.value,
            done: false
        });

        input.value = "";
        save();
    }
};

showTasks();