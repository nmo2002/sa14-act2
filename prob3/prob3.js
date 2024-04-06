const todoForm = document.getElementById('todo-form');
const todoList = document.getElementById('todo-list');

todoForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const title = document.getElementById('todo-title').value;
    const details = document.getElementById('todo-details').value;
    addTask(title, details);
    todoForm.reset();
});

function addTask(title, details) {
    const li = document.createElement('li');
    li.className = 'todo-item';
    li.innerHTML = `
        <span>${title}</span>
        <span>${details}</span>
        <button class="edit-btn">Edit</button>
        <button class="delete-btn">Delete</button>
        <form class="edit-form">
            <input type="text" class="edit-title" value="${title}">
            <input type="text" class="edit-details" value="${details}">
            <button type="submit" class="save-btn">Save</button>
        </form>
    `;
    todoList.appendChild(li);
}

todoList.addEventListener('click', function(e) {
    if (e.target.classList.contains('delete-btn')) {
        e.target.parentElement.remove();
    } else if (e.target.classList.contains('edit-btn')) {
        const item = e.target.parentElement;
        const editForm = item.querySelector('.edit-form');
        const otherElements = item.querySelectorAll(':not(.edit-form)');
        otherElements.forEach(element => {
            element.style.display = 'none';
        });
        editForm.style.display = 'block';
    } else if (e.target.classList.contains('save-btn')) {
        e.preventDefault();
        const item = e.target.parentElement.parentElement;
        const newTitle = item.querySelector('.edit-title').value;
        const newDetails = item.querySelector('.edit-details').value;
        const otherElements = item.querySelectorAll(':not(.edit-form)');
        otherElements.forEach(element => {
            element.style.display = 'inline';
        });
        item.querySelector('span:first-child').textContent = newTitle;
        item.querySelector('span:nth-child(2)').textContent = newDetails;
        item.querySelector('.edit-form').style.display = 'none';
    }
});
