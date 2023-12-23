window.onload = function () {
    setGameEnvironment()
    setButtonClick()
}

const setButtonClick = function () {
    for (let i = 0; i < 10; i++) {
        const button = document.getElementById(`btn${i}`)

        button.addEventListener('click', function () {
            const number = i
            const inputDiv = document.getElementById('input')
            if (inputDiv.innerText.length === 2 || inputDiv.innerText === '-') {
                inputDiv.innerText = ''
            }
            inputDiv.innerText += `${number}`
        })
    }
}

const setGameEnvironment = function () {
    const answer = Math.floor(Math.random() * 99 + 1)
    console.log(`Ans : ${answer}`)
}