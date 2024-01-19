const todoItemTemplate =
	document.querySelector('template').content.querySelector('.todo-wrap')
const todoInput = document.querySelector('#todo-input')
const addBtn = document.querySelector('#add-todo-btn')
const todoSection = document.querySelector('#todo-section')
const modalDeleteBtn = document.querySelector('#modal-delete-btn')
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
		setDeleteBtnsEvent()
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
		const doneTag = todoItem.querySelector('.done-tag')
		const editBtn = todoItem.querySelector('.edit-btn')
		todoName.innerText = todo.content // 這邊就讓doneTag不會自動出現了
		checkbox.id = `checkbox-${todo.id}`
		todoName.htmlFor = checkbox.id

		if (todo.isDone === true) { // 如果todo是完成的狀態時
			todoName.style.color = '#aaa'
			checkbox.checked = true
			editBtn.disabled = true
			editBtn.classList.remove('btn-outline-warning')
			editBtn.classList.add('btn-outline-dark')
		} else { // 如果todo是還沒完成的狀態時
			todoName.style.color = '#000'
			checkbox.checked = false
			editBtn.disabled = false
			editBtn.classList.remove('btn-outline-dark')
			editBtn.classList.add('btn-outline-warning')
			doneTag.remove()
		}
		todoItem.id = `todoItem-${todo.id}`
		todoSection.append(todoItem)
	})

	setDeleteBtnsEvent()
	setEditBtnsEvent()
	changeIsDoneStatus()
}

function setDeleteBtnsEvent() {
	let deleteBtns = document.querySelectorAll('.delete-btn')
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
				// rearrangeTodoId()
				// 這邊不能重新排列localStorage的id，會讓畫面上的id對不起來
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
	let editBtns = document.querySelectorAll('.edit-btn')
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
			editInput.value = todoName.innerHTML
			// 抓到checkbox
			let checkbox = editBtn.parentNode.querySelector('.todo-checkbox')
			// 宣告一個變數去接使用者要更改的值
			let editedString

			if (editBtn.classList.contains('btn-outline-warning')) {
				editBtnIsEdit = true
			} else {
				editBtnIsEdit = false
			}

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
				// 讓checkbox失效
				checkbox.disabled = true
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
				// 讓checkbox恢復
				checkbox.disabled = false
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

// function setCheckboxesEvent(){
// 	let checkboxes = document.querySelectorAll('.todo-checkbox')
// 	checkboxes.forEach(checkbox =>{
// 		checkbox.addEventListener()
// 	})
// }

const doneTagTemplate = document.querySelector('template').content.querySelector('.done-tag')

function changeIsDoneStatus() {
	let checkboxes = document.querySelectorAll('.todo-checkbox')
	checkboxes.forEach(checkbox => {
		checkbox.onchange = function () {
			const todoItem = checkbox.parentNode.parentNode
			const label = todoItem.querySelector('label')
			let todoItemId = parseInt(checkbox.id.split('-')[1])
			let todoIndex = todoArr.findIndex(todo => todo.id === todoItemId)
			const doneTag = doneTagTemplate.cloneNode(true)
			const editBtn = todoItem.parentNode.querySelector('.edit-btn')
			console.log('editBtn at checkbox:')
			console.log(editBtn)
			if (checkbox.checked) {
				// 勾選時文字變灰色，加上一個顯示Done的偽元素
				label.style.color = '#aaa'
				todoItem.append(doneTag)
				// 把editBtn禁用
				editBtn.disabled = true
				editBtn.classList.remove('btn-outline-warning')
				editBtn.classList.add('btn-outline-dark')
				// 修改todoArr並存到localstrage
				todoArr[todoIndex].isDone = true
				saveToJson()
			} else {
				// 勾選時文字變回黑色，移除顯示Done的偽元素
				console.log('into else')
				label.style.color = '#000'
				const doneTagOnScreen = todoItem.querySelector('.done-tag')
				if (doneTagOnScreen) {
					doneTagOnScreen.remove()
				}
				// 把editBtn啟用
				editBtn.disabled = false
				editBtn.classList.remove('btn-outline-dark')
				editBtn.classList.add('btn-outline-warning')
				// 修改todoArr並存到localstrage
				todoArr[todoIndex].isDone = false
				saveToJson()
			}
		}
	})
}