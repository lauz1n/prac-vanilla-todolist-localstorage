window.addEventListener("load", () => {
  todos = JSON.parse(localStorage.getItem("todos")) || []
  const nameInput = document.querySelector("#name")
  const newTodoForm = document.querySelector("#new-todo-form")

  const username = localStorage.getItem("username") || ""

  nameInput.value = username

  //Changing the Name of the User
  nameInput.addEventListener("change", (e) => {
    localStorage.setItem("username", e.target.value)
  })

  // Submit new item to the Task List
  newTodoForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const todo = {
      content: e.target.elements.content.value,
      category: e.target.elements.category.value,
      done: false,
      createdAt: new Date().getTime(),
    }

    todos.push(todo)

    localStorage.setItem("todos", JSON.stringify(todos))

    e.target.reset()
    DisplayTodos()
  })
  DisplayTodos()
})

function DisplayTodos() {
  const todoList = document.querySelector("#todo-list")

  todoList.innerHTML = ""

  Array.from(todos).forEach((todo) => {
    const todoItem = document.createElement("div")
    todoItem.classList.add("todo-item")

    //Creating Form to Display
    const label = document.createElement("label")
    const input = document.createElement("input")
    const span = document.createElement("span")
    const content = document.createElement("div")
    const actions = document.createElement("div")
    const edit = document.createElement("button")
    const deleteBtn = document.createElement("button")

    //Setting up Input checkbox
    input.type = "checkbox"
    input.checked = todo.done
    span.classList.add("bubble")

    //Logical change to checkbox category
    if (todo.category == "personal") {
      span.classList.add("personal")
    } else {
      span.classList.add("business")
    }

    //Adding classes to the elements
    content.classList.add("todo-content")
    actions.classList.add("actions")
    edit.classList.add("edit")
    deleteBtn.classList.add("delete")

    //Setting up Task input and buttons content
    content.innerHTML = `<input type="text" value="${todo.content}" readonly>`
    edit.innerHTML = "Edit"
    deleteBtn.innerHTML = "Delete"

    //Appending elements to father element
    todoItem.appendChild(label)
    todoItem.appendChild(content)
    todoItem.appendChild(actions)
    todoList.appendChild(todoItem)
    label.appendChild(input)
    label.appendChild(span)
    actions.appendChild(deleteBtn)
    actions.appendChild(edit)

    //Logical part to displaying done tasks
    if (todo.done) {
      todoItem.classList.add("done")
    }
    // Listening to click event to handle task state
    input.addEventListener("click", (e) => {
      todo.done = e.target.checked
      localStorage.setItem("todos", JSON.stringify(todos))

      if (todo.done) {
        todoItem.classList.add("done")
      } else {
        todoItem.classList.remove("done")
      }
      DisplayTodos()
    })
  })
}
