const todoItemTemplate =
	document.querySelector('template').content.querySelector('.todo-wrap')
const todoInput = document.querySelector('#todo-input')
const addBtn = document.querySelector('#add-todo-btn')
const todoSection = document.querySelector('#todo-section')
const modalDeleteBtn = document.querySelector('#modal-delete-btn')
let deleteBtns
let editBtns
let todoArr = []

window.onload = function () {
	loadJson()
	renderTodoItem()
}

addBtn.addEventListener('click', function () {
	createTodoObject()
	saveToJson()
	loadJson()
	renderTodoItem()
})

todoInput.addEventListener('keydown', function (e) {
	if (e.key === 'Enter') {
		createTodoObject()
		saveToJson()
		loadJson()
		renderTodoItem()
	}
})

// 依據使用者輸入產生物件
function createTodoObject() {
	let inputText = todoInput.value
	todoArr.push({
		id: 1,
		content: inputText,
		isDone: false
	})
	todoInput.value = ''
	rearrangeTodoId()
}

// 重新排序每個todo的id
function rearrangeTodoId() {
	if (todoArr.length !== 0) {
		todoArr.forEach((todo, idx) => {
			todo.id = idx + 1
		})
	}
}

// 把todo清單儲存成json
function saveToJson() {
	localStorage.setItem('todoArrJsonString', JSON.stringify(todoArr))
}

// 從localStorage讀取todo清單
function loadJson() {
	todoArr = localStorage.getItem('todoArrJsonString') ? JSON.parse(localStorage.getItem('todoArrJsonString')) : []
}

// 把物件渲染到畫面上，並且給id方便操作，再設定delete和edit按鈕
function renderTodoItem() {
	todoSection.innerText = null
	todoArr.forEach((todo, idx) => {
		const todoItem = todoItemTemplate.cloneNode(true)
		const todoName = todoItem.querySelector('.todo-name')
		const checkbox = todoItem.querySelector('.todo-checkbox')
		todoName.innerText = todo.content
		checkbox.id = `checkbox-${todo.id}`
		todoName.htmlFor = checkbox.id
		todoItem.id = `todoItem-${todo.id}`
		todoSection.append(todoItem)
	})

	setDeleteBtnsEvent()
	setEditBtnsEvent()
}

function setDeleteBtnsEvent() {
	deleteBtns = document.querySelectorAll('.delete-btn')
	// 幫每個按鈕掛上事件
	deleteBtns.forEach(deleteBtn => {
		deleteBtn.onclick = function (e) {
			let thePressedBtn = e.target
			console.log(thePressedBtn)
			let modalTitle = document.querySelector('.modal-title')
			let deletingTodoString = thePressedBtn.parentNode.querySelector('.todo-name').innerText
			modalTitle.innerText = `Confirm to delete "${deletingTodoString}" ?`
			// 幫modal上的刪除按鈕掛上事件
			// 用addEventListener會重複掛，所以用onclick
			modalDeleteBtn.onclick = function () {
				deleteTodoObject(thePressedBtn)
				rearrangeTodoId()
				saveToJson()
				loadJson()
			}
		}
	})
}

// 刪除todo物件和從畫面上移除
function deleteTodoObject(deleteBtn) {
	// 刪除todo物件
	let todoItemFullId = deleteBtn.parentNode.id
	console.log(`todoItemFullId: ${todoItemFullId}`)
	let todoItemId = parseInt(todoItemFullId.split('-')[1])
	console.log(`todoItemId: ${todoItemId}`)
	let todoIndex = todoArr.findIndex(todo => todo.id === todoItemId)
	console.log(`todoIndex: ${todoIndex}`)
	todoArr.splice(todoIndex, 1)

	// 刪除畫面上的todoItem
	let todoItem = deleteBtn.parentNode
	todoSection.removeChild(todoItem)
}

// 檢查editBtn現在是Edit還是Save
let editBtnIsEdit = true

function setEditBtnsEvent() {
	editBtns = document.querySelectorAll('.edit-btn')
	// 幫每個按鈕掛上事件
	editBtns.forEach(editBtn => {
		editBtn.onclick = function (e) {
			let editBtn = e.target
			let todoItem = editBtn.parentNode.querySelector('.todo-item')
			// 抓到原本顯示todo事項的label
			const todoName = editBtn.parentNode.querySelector('.todo-name')
			// 設定一個input讓使用者輸入要更新的事項
			let editInput = document.createElement('input')
			editInput.type = 'text'
			editInput.classList.add('edit-input', 'form-control', 'border-0', 'border-start', 'p-2', 'flex-grow-1')
			editInput.value = todoName.innerText
			// 宣告一個變數去接使用者要更改的值
			let editedString

			if (editBtnIsEdit) { // 如果按鈕是Edit狀態
				// 把input放到畫面上
				todoItem.insertBefore(editInput, todoItem.querySelector('.todo-name'))
				// 把原本顯示todo事項的label隱藏掉
				todoName.classList.add('d-none')
				// 把按鈕的文字和顏色改成save的狀態
				editBtn.classList.remove('btn-outline-warning')
				editBtn.classList.add('btn-outline-success')
				editBtn.innerText = 'Save'
				editBtnIsEdit = false
			} else { // 如果按鈕是Save狀態
				// 好像要再取一次畫面上的節點，不能直接拿editInput來用
				let editInputOnScreen = todoItem.querySelector('.edit-input')
				// 取到input的值之後，把他從畫面上移除
				if (editInputOnScreen.value.trim() !== '') {
					editedString = editInputOnScreen.value
					todoName.innerText = editedString
					editTodoObject(editBtn, editedString)
					saveToJson()
				}
				todoItem.removeChild(editInputOnScreen)
				// 把顯示todo事項的label顯示出來
				todoName.classList.remove('d-none')
				// 把按鈕的文字和顏色改回edit的狀態
				editBtn.classList.remove('btn-outline-success')
				editBtn.classList.add('btn-outline-warning')
				editBtn.innerText = 'Edit'
				editBtnIsEdit = true
			}
			console.log(editBtnIsEdit)
		}
	})
}

function editTodoObject(editBtn, editedString) {
	let todoItemFullId = editBtn.parentNode.id
	console.log(`todoItemFullId: ${todoItemFullId}`)
	let todoItemId = parseInt(todoItemFullId.split('-')[1])
	console.log(`todoItemId: ${todoItemId}`)
	let todoIndex = todoArr.findIndex(todo => todo.id === todoItemId)
	console.log(`todoIndex: ${todoIndex}`)
	todoArr[todoIndex].content = editedString
}

function changeIsDoneStatus(){
	
}