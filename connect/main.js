let
    canvas      = document.getElementById('canvas'),
    ctx         = canvas.getContext('2d'),
    paintFlag   = false,
    itemFlag    = false,
    upFlag      = false,
    trueAnswers = 0,
    globalI,
    globalItem

let
    examplesList  = document.getElementById('examples-list'),
    answersList   = document.getElementById('answers-list'),
    resultsElem   = document.getElementById('results'),
    answersCords  = [],
    examplesCords = [],
    cords         = [],
    activeItem,
    activeCords,
    config = {
        lineColor: '#333',
        activeItemColor: '#85DA97',
        falseColor: '#E09F9F',
        lineWidth: 10,
        listBorderWidth: 1,
        itemMargin: 50,
        styles: {
            activation: 'activation', // green
            deactivation: 'deactivation', // black
            reactivation: 'reactivation', // red
        },
        timeoutSpeed: 1500,
        numberOfExamples: 5
    }

canvas.width    = window.innerWidth
canvas.height   = window.innerHeight

ctx.fillStyle   = config.lineColor
ctx.strokeStyle = config.lineColor
ctx.lineWidth   = config.lineWidth

generateIntegerExamples(-10, 10, config.numberOfExamples)
coordinateRecording()
answersUpdate()

function random(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min) + min)
}

function generateIntegerExamples(from = 0, to = 10, count = 5) {
    let
        signs = ['+', '-', '*', '/'],
        answers = []

    for (let i = 1; i <= count; i++) {
        let
            number1 = random(from, to),
            sign = signs[random(0, 3)],
            number2 = random(from, to),
            result

        if (sign === '+') result = number1 + number2
        if (sign === '-') result = number1 - number2
        if (sign === '*') result = number1 * number2
        if (sign === '/') result = number1 / number2

        let exampleLi = document.createElement('li')
        exampleLi.classList.add(`r${i}`)
        if (number2 < 0) exampleLi.innerText = `${number1} ${sign} (${number2})`
        else exampleLi.innerText = `${number1} ${sign} ${number2}`

        exampleLi.addEventListener('mousedown', () => elementMouseDown())
        exampleLi.addEventListener('mouseup', () => elementMouseUp())

        exampleLi.addEventListener('touchstart', () => elementMouseDown())
        exampleLi.addEventListener('touchend', () => elementMouseUp())

        function elementMouseDown() {
            itemFlag = true
            itemStyle(exampleLi, config.styles.activation)
            activeItem = exampleLi
        }

        function elementMouseUp() {
            itemFlag = false
            itemStyle(exampleLi, config.styles.deactivation)
            activeItem = null
        }

        examplesList.appendChild(exampleLi)

        let answerLi = document.createElement('li')
        answerLi.classList.add(`r${i}`)
        answerLi.innerText = `${result}`
        answers.push({id: result, value: answerLi})
    }

    answers.sort((a, b) => a.id > b.id ? 1: -1)
    answers.forEach(answer => answersList.appendChild(answer.value))
}

function itemStyle(item, style = config.styles.activation) {
    switch (style) {
        case config.styles.activation:
            item.style.borderColor = config.activeItemColor
            item.style.color = config.activeItemColor
            break
        case config.styles.deactivation:
            item.style.borderColor = config.lineColor
            item.style.color = config.lineColor
            break
        case config.styles.reactivation:
            item.style.borderColor = config.falseColor
            item.style.color = config.falseColor
            break
    }
}

function clearCanvas() {
    ctx.fillStyle = '#fff'
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)
    ctx.fill()
    ctx.fillStyle = config.lineColor
}

function paint (clientX, clientY, saveFlag = false) {
    ctx.lineTo(clientX, clientY)
    ctx.stroke()

    ctx.beginPath()
    ctx.arc(clientX, clientY, config.lineWidth / 2, 0, Math.PI * 2)
    ctx.fill()

    ctx.beginPath()
    ctx.moveTo(clientX, clientY)

    if (saveFlag) cords.push([clientX, clientY])
}

function answersUpdate() {
    let resultsInner = `<span>${trueAnswers}</span>/${config.numberOfExamples}`
    resultsElem.innerHTML = ''
    resultsElem.insertAdjacentHTML('beforeend', resultsInner)
}

function coordinateRecording() {
    answersCords = []
    examplesCords = []
    for (let i = 0; i <= answersList.children.length - 1; i++) {
        let
            child = answersList.children[i],
            a1 = window.innerWidth - (child.clientWidth + config.listBorderWidth * 2 + config.itemMargin),
            a2 = window.innerWidth - config.itemMargin,
            a3 = child.offsetTop,
            a4 = child.offsetTop + child.clientHeight + config.listBorderWidth * 2

        answersCords.push({
            cords: {a1, a2, a3, a4},
            elem: child
        })
    }

    for (let i = 0; i <= examplesList.children.length - 1; i++) {
        let
            child = examplesList.children[i],
            a1 = child.offsetLeft,
            a2 = child.offsetLeft + child.scrollWidth + config.listBorderWidth * 2,
            a3 = child.offsetTop,
            a4 = child.offsetTop + child.clientHeight + config.listBorderWidth * 2

        examplesCords.push({
            cords: {a1, a2, a3, a4},
            elem: child
        })
    }
}

function documentMouseMove(e) {
    if (activeItem !== undefined) {
        for (let i = 0; i <= examplesCords.length - 1; i++) {
            if (examplesCords[i].elem.classList[0] === activeItem.classList[0]) {
                activeCords = examplesCords[i].cords
            }
        }
    }

    for (let i = 0; i <= examplesCords.length - 1; i++) {
        if (paintFlag && itemFlag) {
            if (
                e.clientX > activeCords.a2 ||
                e.clientY > activeCords.a4 ||
                e.clientY < activeCords.a3
            ) paint(e.clientX, e.clientY, true)

            let item = answersCords[i]
            if (
                e.clientX > item.cords.a1 &&
                e.clientX < item.cords.a2 &&
                e.clientY > item.cords.a3 &&
                e.clientY < item.cords.a4
            ) {
                upFlag = true
                globalI = i
                globalItem = item
            }
        }
    }
}

function documentMouseUp() {
    ctx.beginPath()
    paintFlag = false
    clearCanvas()
    cords.push('mouseup')

    if (upFlag === false) {
        cords = []
        itemStyle(activeItem, config.styles.deactivation)
    }
    else {
        if (activeItem.classList[0] === globalItem.elem.classList[0]) {
            // true answer
            ctx.fillStyle = config.activeItemColor
            ctx.strokeStyle = config.activeItemColor
            cords.forEach(cord => {
                paint(cord[0], cord[1])
            })

            itemStyle(globalItem.elem, config.styles.activation)
            itemStyle(activeItem, config.styles.activation)
            setTimeout(() => {
                ctx.fillStyle = config.lineColor
                ctx.strokeStyle = config.lineColor
                examplesList.removeChild(activeItem)
                answersList.removeChild(answersCords[globalI].elem)
                clearCanvas()
                cords = []
                coordinateRecording()
                trueAnswers++;
                answersUpdate()
            }, config.timeoutSpeed)
        }
        else {
            // false answer
            ctx.fillStyle = config.falseColor
            ctx.strokeStyle = config.falseColor
            cords.forEach(cord => {
                paint(cord[0], cord[1])
            })

            itemStyle(globalItem.elem, config.styles.reactivation)
            itemStyle(activeItem, config.styles.reactivation)
            setTimeout(() => {
                ctx.fillStyle = config.lineColor
                ctx.strokeStyle = config.lineColor
                itemStyle(globalItem.elem, config.styles.deactivation)
                itemStyle(activeItem, config.styles.deactivation)
                clearCanvas()
                cords = []
                coordinateRecording()
            }, config.timeoutSpeed)
        }
    }
}

document.addEventListener('mouseup', () => documentMouseUp())
document.addEventListener('touchend', () => documentMouseUp())

document.addEventListener('mousemove', e => documentMouseMove(e))
document.addEventListener('touchmove', e => documentMouseMove(e))

document.addEventListener('mousedown', () => paintFlag = true)
document.addEventListener('touchstart', () => paintFlag = true)