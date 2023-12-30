const startBtn = document.getElementById('startBtn')
const restartBtn = document.getElementById('restartBtn')
const quitBtn = document.getElementById('quitBtn')
const inputBox = document.getElementById('inputBox')
const guessBtn = document.getElementById('guessBtn')
const recordDiv = document.getElementById('recordDiv')
const answerArr = []

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
	let inputNum = inputBox.value.replace(/\s/g, '')
	console.log(inputNum)

	function checkIfValid(inputNum) {
		if (inputNum.length != 4 || isNaN(inputNum)) {
			alert('Please enter a non-repeating 4 digits number')
			return false
		}

		function checkIfNumRepeated(inputNum) {
			let inputArr = inputNum.split('')
			let uniqueSet = new Set(inputArr)
			return inputArr.length !== uniqueSet.size
		}

		if (checkIfNumRepeated(inputNum)) {
			alert('The entered number is repeated')
			return false
		}
		return true
	}

	if (checkIfValid(inputNum)) {
		let ACount = 0
		let BCount = 0
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
		console.log(`${ACount}A${BCount}B`)
	}

	inputBox.value = ''
}


inputBox.addEventListener('keydown', (e) => {
	if (e.key === "Enter") {
		checkInput()
	}
})

guessBtn.addEventListener('click', checkInput)

