window.onload = function () {
    setAnswer()
    setInputRange()
    ButtonClickEnentAndCheckAnswer()
}

let answer
let minInput = 1
let maxInput = 99
const rangeDiv = document.getElementById('range')

const setAnswer = function () {
    answer = Math.floor(Math.random() * 99 + 1)
    console.log(`Ans : ${answer}`)
}

const setInputRange = function () {
    rangeDiv.innerText = `${minInput.toString().padStart(2,'0')} - ${maxInput}`
}

const checkAnswer = function () {
    let inputNum = parseInt(inputDiv.innerText)
    if (inputDiv.innerText.length === 2) {
        if (inputNum <= minInput || inputNum >= maxInput) {
            alert('請輸入範圍內的數字')
        }
        else if (inputNum < answer) {
            minInput = inputNum
            setInputRange()
        }
        else if (inputNum > answer) {
            maxInput = inputNum
            setInputRange()
        }
        else{
            rangeDiv.innerText = '答對囉'
        }
    }
}

const inputDiv = document.getElementById('input')
const ButtonClickEnentAndCheckAnswer = function () {
    for (let i = 0; i < 10; i++) {
        const button = document.getElementById(`btn${i}`)

        button.addEventListener('click', function () {
            const number = i;
            if (inputDiv.innerText.length === 2 || inputDiv.innerText === '-') {
                inputDiv.innerText = ''
            }
            inputDiv.innerText += `${number}`
            checkAnswer()
        })
    }
}

const buttonR = document.getElementById('btnR')
const resetGame = function () {
    setAnswer()
    inputDiv.innerText = '-'
    minInput = 1
    maxInput = 99
    setInputRange()
}
buttonR.addEventListener('click', resetGame)