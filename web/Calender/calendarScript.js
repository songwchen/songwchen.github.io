let currentFullDate = new Date()
let dateIndex = document.getElementById('date-index')
let todoList = []

// window.onload = function () {
createCurrentCalender(currentFullDate)
loadLocalStorage()
loadTodoToDayBlock()
applyClickingFunctionToTodo()
// new Date(2022, 7, 1) 檢驗用
// }

function loadLocalStorage() {
	const getJsonString = localStorage.getItem('todoListJson')
	todoList = JSON.parse(getJsonString)
	console.log(`JSON parsed, todoList :`)
	console.log(todoList)
}

function saveToLocalStorage() {
	const todoListToJson = JSON.stringify(todoList)
	localStorage.setItem('todoListJson', todoListToJson)
}

function createCurrentCalender(FullDate) {
	// 設定當月年份和月份
	let pYearAndMonth = document.getElementById('p-year-month')
	pYearAndMonth.innerText = `${FullDate.getFullYear()} - ${(FullDate.getMonth() + 1).toString().padStart(2, '0')}`

	// 抓當月的第一天是星期幾
	let firstDayOfWeek = new Date(FullDate.getFullYear(), FullDate.getMonth(), 1).getDay()
	// console.log(`firstDayOfWeek : ${firstDayOfWeek}`)

	// 生成前後月的格子和當月的格子
	let setDayBlock = document.createElement('div')
	setDayBlock.classList.add('day-block')
	setDayBlock.setAttribute('data-bs-target', '#exampleModal')
	setDayBlock.setAttribute('data-bs-toggle', 'modal')
	let setFillingBlock = document.createElement('div')
	setFillingBlock.classList.add('filling-block')

	// 抓當月的前後需要補幾格上下個月的空格
	let blockFrontFillingAmount = (firstDayOfWeek % 7) // 前面要補幾格
	let daysInMonth =
		new Date(FullDate.getFullYear(), FullDate.getMonth() + 1, 0).getDate() // 本身有幾格
	let blockEndFillingAmount =
		(7 - ((blockFrontFillingAmount + daysInMonth) % 7)) % 7 // 後面要補幾格

	// 月曆前方需要補的空格
	for (let i = 0; i < blockFrontFillingAmount; i++) {
		let fillings = setFillingBlock.cloneNode()
		let FullDateCopy = new Date(FullDate)
		FullDateCopy.setDate(1 - (blockFrontFillingAmount - i))
		fillings.innerText = FullDateCopy.getDate()
		dateIndex.append(fillings)
		FullDateCopy = FullDate
	}

	// 月曆本體
	for (let i = 0; i < daysInMonth; i++) {
		let days = setDayBlock.cloneNode()
		let FullDateCopy = new Date(FullDate)
		FullDateCopy.setDate(i + 1)
		const daysDateDiv = document.createElement('div')
		daysDateDiv.innerText = FullDateCopy.getDate()
		days.append(daysDateDiv)
		if (FullDateCopy.getDate() == FullDate.getDate() &&
			FullDateCopy.getMonth() == currentFullDate.getMonth() &&
			FullDateCopy.getFullYear() == currentFullDate.getFullYear()) {
			days.style.backgroundColor = '#D2F0CD'
			daysDateDiv.style.backgroundColor = '#D2F0CD'
			days.style.border = '2px #8BC881 solid'
		}
		dateIndex.append(days)
	}

	// 月曆後方需要補的空格
	for (let i = 0; i < blockEndFillingAmount; i++) {
		let fillings = setFillingBlock.cloneNode()
		let FullDateCopy = new Date(FullDate)
		FullDateCopy.setDate(i + 1)
		FullDateCopy.setMonth(FullDateCopy.getMonth() + 1)
		fillings.innerText = FullDateCopy.getDate()
		dateIndex.append(fillings)
		FullDateCopy = FullDate
	}
}

// 製作切換月份
// 抓切換月份的按鈕和設定月份的加減值
let prevBtn = document.querySelector('#control-btn-and-year-month button:first-child')
let nextBtn = document.querySelector('#control-btn-and-year-month button:last-child')
let monthAdder = 0

// 下個月的按鈕
prevBtn.addEventListener('click', function () {
	monthAdder -= 1
	dateforCalculation = new Date()
	dateIndex.innerText = ''
	dateforCalculation.setMonth(dateforCalculation.getMonth() + monthAdder)
	createCurrentCalender(dateforCalculation)
	loadTodoToDayBlock()
})

// 上個月的按鈕
nextBtn.addEventListener('click', function () {
	monthAdder += 1
	dateforCalculation = new Date()
	dateIndex.innerText = ''
	dateforCalculation.setMonth(dateforCalculation.getMonth() + monthAdder)
	createCurrentCalender(dateforCalculation)
	loadTodoToDayBlock()
})

let dayblocks = document.querySelectorAll('#date-index')
let clickedBlock
dayblocks.forEach(function (dayblock) {
	dayblock.addEventListener('click', function (e) {
		if (e.target.classList.contains('day-block')) {
			clickedBlock = e.target
			setModalContent(e.target)
		}
	})
})

// 生成modal內容
let eightDigitsDateForId
function setModalContent(e) {
	let year = document.getElementById('p-year-month').innerText.substring(0, 4)
	let month = document.getElementById('p-year-month').innerText.substring(7, 9)
	// console.log(e)
	let day = e.querySelector('div').innerText.padStart(2, '0')
	eightDigitsDateForId = `${year}${month}${day}`
	console.log(`${year} - ${month} - ${day}`)

	let modalTitle = document.getElementById('exampleModalLabel')

	modalTitle.innerText = `${year}-${month}-${day}`
}

let sendMessageBtn = document.getElementById('send-message')
sendMessageBtn.addEventListener('click', function () {
	createTodoItemAndSubmit(eightDigitsDateForId)
	saveToLocalStorage()
})

// modal已經顯示，輸入完後按下送出
function createTodoItemAndSubmit(eightDigitsDateForId) {
	let isIdRepeated = false
	let todoId
	let itemDigit = 1
	do {
		todoId = eightDigitsDateForId + itemDigit.toString()
		isIdRepeated = todoList.map(item => item.id).some(id => id === todoId)
		if (isIdRepeated) {
			itemDigit++
		}
	} while (isIdRepeated);
	isIdRepeated = false
	itemDigit = 1

	console.log(todoId)

	const timePicker = document.getElementById('time-picker')
	let todoTitle = document.getElementById('title-text')
	let todoContent = document.getElementById('content-text')

	todoList.push(
		{
			id: todoId,
			time: timePicker.value.replace(':', ''),
			title: todoTitle.value,
			content: todoContent.value,
		}
	)

	console.log(`After pushed, todoList :`)
	console.log(todoList)

	let pTodoItem = document.createElement('p')
	pTodoItem.innerText = todoTitle.value
	pTodoItem.setAttribute('todoItem-id', todoId)
	clickedBlock.append(pTodoItem)
}

// 把todo載入到dayblock
function loadTodoToDayBlock() {
	if (todoList) {
		// 取得現在是幾年幾月(todoItem.id的前六碼)
		let year = document.getElementById('p-year-month').innerText.substring(0, 4)
		let month = document.getElementById('p-year-month').innerText.substring(7, 9)
		let yyyymm = year.concat(month)
		console.log(`yyyymm : ${yyyymm}`)

		// 篩選出這個月的todoItem


		let todosOfThisMonth = todoList.filter(item => item.id.substring(0, 6) === yyyymm)

		console.log(`todosOfThisMonth :`)
		console.log(todosOfThisMonth)

		// 
		todosOfThisMonth.forEach(todoItem => {
			let todoDate = todoItem.id.substring(6, 8)
			let dateDivs = document.querySelectorAll('.day-block div') // 取得當月所有dayblock的數字
			console.log('dateDivs :')
			console.log(dateDivs)
			let targetDateDiv = Array.from(dateDivs).find(dayDiv => dayDiv.innerText.padStart(2, '0') == todoDate) // 取得與todoItem相同日期的div
			console.log(`targetDateDiv : ${targetDateDiv.innerText}`)
			let pTodoItem = document.createElement('p')
			pTodoItem.setAttribute('todoItem-id', todoItem.id)
			pTodoItem.append(todoItem.title)
			targetDateDiv.parentNode.append(pTodoItem)
		})
	}
}

function applyClickingFunctionToTodo() {
	let todoItemsInBlock = document.querySelectorAll('p[todoitem-id]')
	console.log('todoItemsInBlock :')
	console.log(todoItemsInBlock)
	todoItemsInBlock.forEach(function (todoItem) {
		todoItem.addEventListener('click', function (e) {
			console.log('p clicked :')
			console.log(e.target)
			e.stopPropagation()
		})
	})

}

function editTodo() {

}




