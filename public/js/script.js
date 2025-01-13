const apiBase = "/api/todos";
const todoForm = document.getElementById("todo-form");
const todoList = document.getElementById("todo-list");

document.addEventListener("DOMContentLoaded", fetchTodos);

// Add a new todo
todoForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const text = document.getElementById("todo-text").value.trim();
  const category = document.getElementById("todo-category").value.trim();

  if (text) {
    try {
      const response = await axios.post(apiBase, { text, category });
      renderTodos(response.data);
      todoForm.reset();
    } catch (err) {
      console.error("Error adding todo:", err);
    }
  }
});

// Fetch and render todos
async function fetchTodos() {
  try {
    const response = await axios.get(apiBase);
    renderTodos(response.data);
  } catch (err) {
    console.error("Error fetching todos:", err);
  }
}

// Render todos to the DOM
function renderTodos(todos) {
  todoList.innerHTML = "";
  todos.forEach((todo) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${todo.text} (${todo.category || "General"})</span>
      <div class="actions">
        <button onclick="editTodo('${todo._id}', '${todo.text}', '${
      todo.category
    }')">Edit</button>
        <button onclick="deleteTodo('${todo._id}')">Delete</button>
      </div>
    `;
    todoList.appendChild(li);
  });
}

// Edit a todo
async function editTodo(id, text, category) {
  const newText = prompt("Edit todo text:", text);
  const newCategory = prompt("Edit category:", category);

  if (newText !== null) {
    try {
      const response = await axios.put(`${apiBase}/${id}`, {
        text: newText,
        category: newCategory || "General",
      });
      renderTodos(response.data);
    } catch (err) {
      console.error("Error editing todo:", err);
    }
  }
}

// Delete a todo
async function deleteTodo(id) {
  if (confirm("Are you sure you want to delete this todo?")) {
    try {
      const response = await axios.delete(`${apiBase}/${id}`);
      renderTodos(response.data);
    } catch (err) {
      console.error("Error deleting todo:", err);
    }
  }
}
