let currentFullDate = new Date()
let dateIndex = document.getElementById('date-index')

window.onload = function () {
	createCurrentCalender(currentFullDate)
	// new Date(2022, 7, 1) 檢驗用
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
	// console.log(`blockFrontFillingAmount : ${blockFrontFillingAmount}`)
	// console.log(`blockEndFillingAmount : ${blockEndFillingAmount}`)

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
})

// 上個月的按鈕
nextBtn.addEventListener('click', function () {
	monthAdder += 1
	dateforCalculation = new Date()
	dateIndex.innerText = ''
	dateforCalculation.setMonth(dateforCalculation.getMonth() + monthAdder)
	createCurrentCalender(dateforCalculation)
})

let dayblocks = document.querySelectorAll('#date-index')
let clickedBlock
dayblocks.forEach(function (dayblock) {
	dayblock.addEventListener('click', function (e) {
		if (e.target.classList.contains('day-block')) {
			clickedBlock = e.target
			addTodoItem(e.target)
		}
	})
})

const todoList = []
let eightDigitsDateForId


function addTodoItem(e) {
	let year = document.getElementById('p-year-month').innerText.substring(0, 4)
	let month = document.getElementById('p-year-month').innerText.substring(7, 9)
	// console.log(e)
	let day = e.childNodes[0].nodeValue.padStart(2, '0')
	eightDigitsDateForId = `${year}${month}${day}`
	// console.log(`${year} - ${month} - ${day}`)

	let modalTitle = document.getElementById('exampleModalLabel')

	modalTitle.innerText = `${year}-${month}-${day}`
}

let sendMessageBtn = document.getElementById('send-message')
sendMessageBtn.addEventListener('click', function () {
	createTodoItemAndSubmit(eightDigitsDateForId)
})

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

	console.log(`todoList :`)
	console.log(todoList)

	let pTodoItem = document.createElement('p')
	pTodoItem.innerText = todoTitle.value
	pTodoItem.setAttribute('todo-id',todoId)
	clickedBlock.append(pTodoItem)

	const todoListToJson = JSON.stringify(todoList)
	localStorage.setItem('todoListJson', todoListToJson)
}

// 把todo載入到dayblock
function loadTodoToDayBlock(){
	// 取得todo
}




