const inputBox = document.querySelector('#todo-input')
const addTodoBtn = document.querySelector('#add-todo-btn')
const todoSection = document.querySelector('#todo-section')
const setTodoItem = document.querySelector('#todo-width')
const deleteBtns = document.querySelectorAll('.delete-btn')
const editBtns = document.querySelectorAll('.edit-btn')
const modalNahBtn = document.querySelector('#modal-nah-btn')
const modalDeleteBtn = document.querySelector('#modal-delete-btn')

let todoArr = []

window.onload = function () {
	loadTodoItem()
}

function loadTodoItem() {
	todoArr = localStorage.getItem('todoArrAsJson') ?
		JSON.parse(localStorage.getItem('todoArrAsJson')) : []
	if (todoArr.length !== 0) {
		for (todo of todoArr) {
			console.log(todo)
			renderTodoItem(todo.id, todo.text)
		}
	}
}

function renderTodoItem(id, text) {
	let todoItem = setTodoItem.cloneNode(true)
	let todoStringBox = todoItem.querySelector('#todo-name')
	todoStringBox.innerText = text
	todoItem.setAttribute('todo-id', id)
	todoItem.classList.remove('d-none')
	todoItem.classList.add('d-flex')
	todoSection.append(todoItem)
}

function storeJson() {
	localStorage.setItem('todoArrAsJson', JSON.stringify(todoArr))
}

function createTodoObject() {
	let todoString = inputBox.value
	let todoId = todoArr.length + 1
	todoArr.push({
		id: todoId,
		text: todoString,
		isDone: false,
	})

	console.log('todoArr : ')
	console.log(todoArr)

	renderTodoItem(todoId, todoString)
	storeJson()
	inputBox.value = ''
}

addTodoBtn.addEventListener('click', createTodoObject)
inputBox.addEventListener('keydown', function (event) {
	if (event.key === 'Enter') {
		createTodoObject();
	}
});

function deleteTodoItem(e) {
	console.log('e')
	console.log(e)
}

deleteBtns.forEach(deleteBtn => {
	deleteBtn.addEventListener('click', function (e) {
		console.log('1')
		console.log(e.target)
		e.stopPropagation()
		// deleteTodoItem(e)
	})
})