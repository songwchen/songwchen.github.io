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

function disableStartBtn() {
	startBtn.setAttribute('disabled', true)
}

function enableRestartBtn() {
	restartBtn.removeAttribute('disabled')
}

startBtn.addEventListener('click', createRandomNumber)
startBtn.addEventListener('click', disableStartBtn)
startBtn.addEventListener('click', enableRestartBtn)

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

function AddRecord() {
	let resultArr = checkInput()
	console.log(`resultArr : ${resultArr}`)

	let li = document.createElement('li')
	let span = document.createElement('span')
	let ul = document.querySelector('ul')

	ul.classList.add('list-group', 'mt-3')
	li.classList.add('list-group-item', 'position-relative', 'd-flex', 'justify-content-center', 'align-items-center')
	span.classList.add('position-absolute', 'text-bg-warning', 'px-3', 'py-1', 'start-0', 'ms-2', 'rounded')


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

	if(span.classList.contains('text-bg-success')){
		let liSuccess = li.cloneNode(false)
		liSuccess.classList.add('text-bg-success')
		liSuccess.innerText = 'Success !'
		ul.append(liSuccess)
		quitBtn.setAttribute('disabled', 'true')
		guessBtn.setAttribute('disabled', 'true')
	}

	ACount = 0
	BCount = 0
}

inputBox.addEventListener('keydown', (e) => {
	if (e.key === "Enter") {
		AddRecord()
	}
})

guessBtn.addEventListener('click', () => {
	AddRecord()
})

restartBtn.addEventListener('click', () => {
	quitBtn.removeAttribute('disabled')
	guessBtn.removeAttribute('disabled')
	answerArr = []
	createRandomNumber()
	let ul = document.querySelector('ul')
	ul.innerText = ''
})