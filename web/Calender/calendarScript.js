let currentFullDate = new Date()
let currentYear = currentFullDate.getFullYear()
let currentMonthJS = currentFullDate.getMonth()
let currentDay = currentFullDate.getDate()
console.log(`currentFullDate : ${currentFullDate}`)
console.log(`currentYear : ${currentYear}`)
console.log(`currentMonth : ${currentMonthJS + 1}`)
console.log(`currentDay : ${currentDay}`)

function createCurrentCalender() {
	// 抓當月的第一天是星期幾
	let firstDayOfWeek = new Date(currentYear, currentMonthJS, 1).getDay()
	console.log(`firstDayOfWeek : ${firstDayOfWeek}`)

	// 抓當月的前後需要補幾格上下個月的空格
	let blockFrontFillingAmount = (firstDayOfWeek % 7)
	let daysInMonth = new Date(currentYear, currentMonthJS + 1, 0).getDate()
	let blockEndFillingAmount = (7 - ((blockFrontFillingAmount + daysInMonth) % 7)) % 7
	console.log(`blockFrontFillingAmount : ${blockFrontFillingAmount}`)
	console.log(`blockEndFillingAmount : ${blockEndFillingAmount}`)

	let setDayBlock = document.createElement('div')
	setDayBlock.classList.add('day-block')
	let setFillingBlock = document.createElement('div')
	setFillingBlock.classList.add('filling-block')
	for (let i = 0; i < blockFrontFillingAmount; i++) {
		let dayBlock = setDayBlock.cloneNode()

	}
}

createCurrentCalender()