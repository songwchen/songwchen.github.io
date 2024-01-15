const inputBox = document.querySelector('#todo-input')
const addTodoBtn = document.querySelector('#add-todo-btn')
const todoSection = document.querySelector('#todo-section')
const setTodoItem = document.querySelector('#todo-width')
let deleteBtns
let editBtns
const modalNahBtn = document.querySelector('#modal-nah-btn')
const modalDeleteBtn = document.querySelector('#modal-delete-btn')
const modalWindow = document.querySelector('#confirm-to-delete-modal')

let todoArr = []

window.onload = function () {
	loadTodoItem()
	deleteBtnEvent()
}

function loadTodoItem() {
	todoSection.innerText = ''
	todoArr = localStorage.getItem('todoArrAsJson') ?
		JSON.parse(localStorage.getItem('todoArrAsJson')) : []
	if (todoArr.length !== 0) {
		todoArr.forEach((todo, idx) => {
			todo.id = idx + 1 // rearrange id
			console.log(todo)
			console.log(idx)
			renderTodoItem(todo.id, todo.text)
		})
	}
}

function renderTodoItem(id, text) {
	let todoItem = setTodoItem.cloneNode(true)
	let todoCheckBox = todoItem.querySelector('.todo-checkbox')
	let todoStringBox = todoItem.querySelector('.todo-name')
	todoCheckBox.id = 'todo-checkbox-' + id.toString()
	todoStringBox.id = 'todo-name-' + id.toString()
	todoStringBox.htmlFor = 'todo-checkbox-' + id.toString()
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
	loadTodoItem()
	deleteBtnEvent()
	inputBox.value = ''
}

addTodoBtn.addEventListener('click', createTodoObject)
inputBox.addEventListener('keydown', function (event) {
	if (event.key === 'Enter') {
		createTodoObject();
	}
});

function deleteBtnEvent(){
	deleteBtns = document.querySelectorAll('.delete-btn')
	editBtns = document.querySelectorAll('.edit-btn')

	// Add Delete Button Event
	deleteBtns.forEach(deleteBtn => {
		deleteBtn.addEventListener('click', function (e) {
			e.stopPropagation()
			todoIndex = e.target.parentNode.getAttribute('todo-id')
			modalDeleteBtn.addEventListener('click', () => {
				todoArr = todoArr.filter(todo => todo.id != todoIndex)
				console.log(todoArr)
				storeJson()
				loadTodoItem()
			})
		})
	})
}