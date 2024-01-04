let currentFullDate = new Date()
let dateIndex = document.getElementById('date-index')

window.onload = function(){
	createCurrentCalender(currentFullDate)
	// new Date(2022, 7, 1) 檢驗用
}

function createCurrentCalender(FullDate) {
	// 設定當月年份和月份
	let pYearAndMonth = document.getElementById('p-year-month')
	pYearAndMonth.innerText = `${FullDate.getFullYear()} - ${FullDate.getMonth() + 1}`

	// 抓當月的第一天是星期幾
	let firstDayOfWeek = new Date(FullDate.getFullYear(), FullDate.getMonth(), 1).getDay()
	// console.log(`firstDayOfWeek : ${firstDayOfWeek}`)

	// 抓當月的前後需要補幾格上下個月的空格
	let blockFrontFillingAmount = (firstDayOfWeek % 7) // 前面要補幾格
	let daysInMonth =
		new Date(FullDate.getFullYear(), FullDate.getMonth() + 1, 0).getDate() // 本身有幾格
	let blockEndFillingAmount =
		(7 - ((blockFrontFillingAmount + daysInMonth) % 7)) % 7 // 後面要補幾格
	// console.log(`blockFrontFillingAmount : ${blockFrontFillingAmount}`)
	// console.log(`blockEndFillingAmount : ${blockEndFillingAmount}`)

	// 生成前後月的格子和當月的格子
	let setDayBlock = document.createElement('div')
	setDayBlock.classList.add('day-block')
	let setFillingBlock = document.createElement('div')
	setFillingBlock.classList.add('filling-block')

	// 月曆前方需要補的空格
	for (let i = 0; i < blockFrontFillingAmount; i++) {
		let fillingBlock = setFillingBlock.cloneNode()
		let FullDateCopy = new Date(FullDate)
		FullDateCopy.setDate(1 - (blockFrontFillingAmount - i))
		fillingBlock.innerText = FullDateCopy.getDate()
		dateIndex.append(fillingBlock)
		FullDateCopy = FullDate
	}

	// 月曆本體
	for (let i = 0; i < daysInMonth; i++) {
		let dayBlock = setDayBlock.cloneNode()
		FullDate.setDate(i + 1)
		dayBlock.innerText = FullDate.getDate()
		dateIndex.append(dayBlock)
	}

	// 月曆後方需要補的空格
	for (let i = 0; i < blockEndFillingAmount; i++) {
		let fillingBlock = setFillingBlock.cloneNode()
		let FullDateCopy = new Date(FullDate)
		FullDateCopy.setDate(i + 1)
		FullDateCopy.setMonth(FullDateCopy.getMonth() + 1)
		fillingBlock.innerText = FullDateCopy.getDate()
		dateIndex.append(fillingBlock)
		FullDateCopy = FullDate
	}
}

let prevBtn = document.querySelector('#control-btn-and-year-month button:first-child')
let nextBtn = document.querySelector('#control-btn-and-year-month button:last-child')
let monthAdder = 0

prevBtn.addEventListener('click', function(){
	monthAdder -= 1
	dateforCalculation = new Date()
	dateIndex.innerText = ''
	dateforCalculation.setMonth(dateforCalculation.getMonth() + monthAdder)
	createCurrentCalender(dateforCalculation)
})

nextBtn.addEventListener('click', function(FullDate){
	monthAdder += 1
	dateforCalculation = new Date()
	dateIndex.innerText = ''
	dateforCalculation.setMonth(dateforCalculation.getMonth() + monthAdder)
	createCurrentCalender(dateforCalculation)
})

const exampleModal = document.getElementById('exampleModal')
if (exampleModal) {
	exampleModal.addEventListener('show.bs.modal', event => {
		// Button that triggered the modal
		const button = event.relatedTarget
		// Extract info from data-bs-* attributes
		const recipient = button.getAttribute('data-bs-whatever')
		// If necessary, you could initiate an Ajax request here
		// and then do the updating in a callback.

		// Update the modal's content.
		const modalTitle = exampleModal.querySelector('.modal-title')
		const modalBodyInput = exampleModal.querySelector('.modal-body input')

		modalTitle.textContent = `New message to ${recipient}`
		modalBodyInput.value = recipient
	})
}