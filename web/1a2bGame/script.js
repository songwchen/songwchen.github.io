const startBtn = document.getElementById('startBtn')
const restartBtn = document.getElementById('restartBtn')
const quitBtn = document.getElementById('quitBtn')
const inputBox = document.getElementById('inputBox')
const guessBtn = document.getElementById('guessBtn')
const recordDiv = document.getElementById('recordDiv')
let answerArr = []
let inputNum
let ACount = 0
let BCount = 0

function createRandomNumber() {
	while (answerArr.length < 4) {
		singleNum = Math.floor(Math.random() * 10)

		if (answerArr.indexOf(singleNum) === -1) {
			answerArr.push(singleNum)
		}
	}
	console.log(`The answer is : ${answerArr}`)
	return answerArr
}

startBtn.addEventListener('click', () => {
	createRandomNumber()
	startBtn.setAttribute('disabled', true)
	restartBtn.removeAttribute('disabled')
	quitBtn.removeAttribute('disabled')
	guessBtn.removeAttribute('disabled')
	inputBox.addEventListener('keydown', enterKeyEvent)
	guessBtn.addEventListener('click', AddRecord)
})

function checkInput() {
	inputNum = inputBox.value.replace(/\s/g, '')
	console.log(inputNum)

	let isValid = true

	function checkIfValid(inputNum) {
		if (inputNum.length != 4 || isNaN(inputNum)) {
			alert('Please enter a non-repeating 4 digits number')
			return isValid = false
		}

		function checkIfNumRepeated(inputNum) {
			let inputArr = inputNum.split('')
			let uniqueSet = new Set(inputArr)
			return inputArr.length !== uniqueSet.size
		}

		if (checkIfNumRepeated(inputNum)) {
			alert('The entered number is repeated')
			return isValid = false
		}
		return isValid = true
	}

	if (checkIfValid(inputNum)) {
		let inputArr = inputNum.split('')
		console.log(answerArr)
		inputArr.forEach((item, index) => {
			if (item == answerArr[index]) {
				ACount++
			}
			else if (answerArr.includes(parseInt(item))) {
				BCount++
			}
		})
	}
	inputBox.value = ''
	console.log(`?A?B : ${ACount}A${BCount}B`)
	console.log(`inputNum : ${inputNum}`)
	return [`${ACount}A${BCount}B`, inputNum, isValid]
}

let setLi = document.createElement('li')
let setSpan = document.createElement('span')
let ul = document.querySelector('ul')

ul.classList.add('list-group', 'mt-3')
setLi.classList.add('list-group-item', 'position-relative', 'd-flex', 'justify-content-center', 'align-items-center')
setSpan.classList.add('position-absolute', 'text-bg-warning', 'px-3', 'py-1', 'start-0', 'ms-2', 'rounded')

function AddRecord() {
	let resultArr = checkInput()
	console.log(`resultArr : ${resultArr}`)

	li = setLi.cloneNode(false)
	span = setSpan.cloneNode(false)

	if (resultArr[2]) {
		span.innerText = resultArr[0]
		li.innerText = resultArr[1]

		if (ACount === 4 && BCount === 0) {
			span.classList.replace('text-bg-warning', 'text-bg-success')
		}
	}
	else {
		span.innerText = 'Invalid Input'
		li.innerText = resultArr[1]
		span.classList.replace('text-bg-warning', 'text-bg-danger')
	}

	li.insertBefore(span, li.firstChild)
	ul.append(li)
	if (span.classList.contains('text-bg-success')) {
		let liSuccess = li.cloneNode(false)
		liSuccess.innerText = 'Success !'
		liSuccess.setAttribute('style', 'transition: 0.3s ease;')
		liSuccess.classList.add('text-bg-success')
		let currentColorClass = 0
		setInterval(() => {
			let colorArr = ['text-bg-danger', 'text-bg-warning', 'text-bg-success', 'text-bg-info']
			currentColorClass = (currentColorClass % 4)
			liSuccess.classList.remove(colorArr[0], colorArr[1], colorArr[2], colorArr[3])
			liSuccess.classList.add(colorArr[currentColorClass])
			currentColorClass++
		}, 1000)
		ul.append(liSuccess)
		quitBtn.setAttribute('disabled', true)
		guessBtn.setAttribute('disabled', true)
		inputBox.removeEventListener('keydown', enterKeyEvent)
		guessBtn.removeEventListener('click', AddRecord)
	}
	window.scrollTo(0, document.body.scrollHeight)

	ACount = 0
	BCount = 0
}

function enterKeyEvent(e) {
	if (e.key === "Enter") {
		AddRecord()
	}
}

restartBtn.addEventListener('click', () => {
	quitBtn.removeAttribute('disabled')
	guessBtn.removeAttribute('disabled')

	inputBox.removeEventListener('keydown', enterKeyEvent)
	guessBtn.removeEventListener('click', AddRecord)
	inputBox.addEventListener('keydown', enterKeyEvent)
	guessBtn.addEventListener('click', AddRecord)

	answerArr = []
	createRandomNumber()
	let ul = document.querySelector('ul')
	ul.innerText = ''
})

function seeTheAnswer() {
	answerLi = setLi.cloneNode(false)
	answerLi.innerText = `The answer is ${answerArr.join('')}`
	ul.append(answerLi)
}

quitBtn.addEventListener('click', () => {
	guessBtn.setAttribute('disabled', true)
	quitBtn.setAttribute('disabled', true)
	seeTheAnswer()
})