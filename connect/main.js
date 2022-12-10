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
    loader        = document.querySelector('.loader'),
    textWrapper   = document.querySelector('.ml3'),
    answersCords  = [],
    examplesCords = [],
    cords         = [],
    activeItem,
    activeCords,
    config = {
        lineColor: '#333',
        activeItemColor: '#85DA97',
        falseColor: '#E09F9F',
        lineWidth: 4,
        listBorderWidth: 1,
        itemMargin: 50,
        styles: {
            activation: 'activation', // green
            deactivation: 'deactivation', // black
            reactivation: 'reactivation', // red
        },
        timeoutSpeed: 1500,
        numberOfExamples: 5,
        endTime: 4000,
        loaderTime: 3000,
        themeDataBase: null,
        numberOfExamplesDataBase: null,
        soundsDataBase: null
    }

canvas.width    = window.innerWidth
canvas.height   = window.innerHeight

ctx.fillStyle   = config.lineColor
ctx.strokeStyle = config.lineColor
ctx.lineWidth   = config.lineWidth

textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

anime.timeline({loop: true})
    .add({
        targets: '.ml3 .letter',
        opacity: [0,1],
        easing: "easeInOutQuad",
        duration: 2250,
        delay: (el, i) => 150 * (i+1)
    }).add({
    targets: '.ml3',
    opacity: 0,
    duration: 1000,
    easing: "easeOutExpo",
    delay: config.loaderTime
})

getAllOfDataBase()

setTimeout(() => {
    zeroing()
    if(config.numberOfExamplesDataBase === 1) generateIntegerExamples(-9, 9, config.numberOfExamples)
    if(config.numberOfExamplesDataBase === 2) generateIntegerExamples(-99, 99, config.numberOfExamples)
    if(config.numberOfExamplesDataBase === 3) generateIntegerExamples(-999, 999, config.numberOfExamples)
    coordinateRecording()
    answersUpdate()
    loader.style.opacity = '0'
    loader.style.zIndex  = '0'
}, config.loaderTime)

//
// function connectToDataBase() {
//     fetch('https://mathpt-a7d23-default-rtdb.firebaseio.com/data.json', {
//         headers: {
//
//         }
//     })
// }

function getAllOfDataBase() {
    // fetch('https://mathpt-a7d23-default-rtdb.firebaseio.com/data.json', {
    //     headers: {
    //         'Content-Type': 'application/json;charset=utf-8'
    //     },
    //     method: 'GET'
    // }).then(response => {
    //     let res = response.json()
    //     res.then(result => {
    //         // let key
    //         // for (const elemResult in result) { key = elemResult }
    //         config.themeDataBase = 'standart'
    //         config.numberOfExamplesDataBase = 5
    //         config.soundsDataBase = false
    //     })
    // })

    config.themeDataBase = 'standart'
    config.numberOfExamplesDataBase = 1
    config.soundsDataBase = false
}

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
            if(!isMobile()) activeItem = null
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

function isMobile() {
    return /Mobile|webOS|BlackBerry|IEMobile|MeeGo|mini|Fennec|Windows Phone|Android|iP(ad|od|hone)/i.test(navigator.userAgent);
}

function documentMouseMove(e) {
    if (activeItem !== undefined) {
        for (let i = 0; i <= examplesCords.length - 1; i++) {
            if (examplesCords[i].elem.classList[0] === activeItem.classList[0]) {
                activeCords = examplesCords[i].cords
            }
        }
    }

    let clientX, clientY
    if (isMobile()) {
        clientX = e.touches[0].clientX
        clientY = e.touches[0].clientY
    }
    else {
        clientX = e.clientX
        clientY = e.clientY
    }
    for (let i = 0; i <= examplesCords.length - 1; i++) {
        if (paintFlag && itemFlag) {
            console.log(activeCords.a2, activeCords.a3)

            if (
                clientX > activeCords.a2 ||
                clientY > activeCords.a4 ||
                clientY < activeCords.a3
            ) paint(clientX, clientY, true)

            let item = answersCords[i]
            if (
                clientX > item.cords.a1 &&
                clientX < item.cords.a2 &&
                clientY > item.cords.a3 &&
                clientY < item.cords.a4
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

            if(config.soundsDataBase) {
                let audio = new Audio('./sounds/trueAnswer.mp3').play()
            }

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
                checkNumberOfExamples()
                if(isMobile()) activeItem = null
            }, config.timeoutSpeed)
        }
        else {
            // false answer
            ctx.fillStyle = config.falseColor
            ctx.strokeStyle = config.falseColor
            cords.forEach(cord => {
                paint(cord[0], cord[1])
            })

            if(config.soundsDataBase) {
                let audio = new Audio('./sounds/falseAnswer.mp3').play()
            }

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
                if(isMobile()) activeItem = null
            }, config.timeoutSpeed)
        }
    }
}

function zeroing() {
    paintFlag     = false
    itemFlag      = false
    upFlag        = false
    trueAnswers   = 0
    globalI       = undefined
    globalItem    = undefined
    activeItem    = undefined
    activeCords   = undefined
    answersCords  = []
    examplesCords = []
    cords         = []
    ctx.fillStyle = config.lineColor
    ctx.strokeStyle = config.lineColor
    ctx.lineWidth = config.lineWidth
}

const rndColor = () => {
    const base  = Math.random() * 360 | 0
    const color = (275 * (base / 200 | 0)) + base % 200
    return fac => `hsl(${color}, ${(fac || 1) * 100}%, ${(fac || 1) * 60}%)`
}

function checkNumberOfExamples() {
    if (trueAnswers === config.numberOfExamples) {
        let a = new Fireworks()
        a.run()

        let good = document.querySelector('.good')
        good.classList.replace('good_hide', 'good_show')

        setTimeout(() => {
            a.stop()
            good.classList.replace('good_show', 'good_hide')

            ctx.beginPath()
            zeroing()
            clearCanvas()
            generateIntegerExamples(-10, 10, config.numberOfExamples)
            coordinateRecording()
            answersUpdate()
        }, config.endTime)
    }
}

class Battery
{
    constructor(fireworks) {
        this.fireworks = fireworks
        this.salve = []
        this.x     = Math.random()
        this.t     = 0
        this.tmod  = 20 + Math.random() * 20 | 0
        this.tmax  = 500 + Math.random() * 1000

        this._shot = salve => {
            if (salve.y < salve.ym) {
                salve.cb = this._prepareExplosion
            }

            salve.x += salve.mx
            salve.y -= 0.01

            const r = Math.atan2(-0.01, salve.mx)

            this.fireworks.engine.strokeStyle = salve.c(.7)
            this.fireworks.engine.beginPath()

            this.fireworks.engine.moveTo(
                (this.x + salve.x) * this.fireworks.width + Math.cos(r) * 4,
                salve.y * this.fireworks.height + Math.sin(r) * 4
            )

            this.fireworks.engine.lineTo(
                (this.x + salve.x) * this.fireworks.width + Math.cos(r + Math.PI) * 4,
                salve.y * this.fireworks.height + Math.sin(r + Math.PI) * 4
            )

            this.fireworks.engine.lineWidth = 3
            this.fireworks.engine.stroke()

        };

        this._prepareExplosion = salve => {
            salve.explosion = []

            for (let i = 0, max = 32; i < max; i++) {
                salve.explosion.push({
                    r : 2 * i / Math.PI,
                    s : 1 + Math.random() * 0.5,
                    d : 0,
                    y : 0
                })
            }

            salve.cb = this._explode
        };

        this._explode = salve => {

            this.fireworks.engine.fillStyle = salve.c()

            salve.explosion.forEach(explo => {

                explo.d += explo.s
                explo.s *= 0.99
                explo.y += 0.5

                const alpha = explo.s * 2.5
                this.fireworks.engine.globalAlpha = alpha

                if (alpha < 0.05) {
                    salve.cb = null
                }

                this.fireworks.engine.fillRect(
                    Math.cos(explo.r) * explo.d + (this.x + salve.x) * this.fireworks.width,
                    Math.sin(explo.r) * explo.d + explo.y + salve.y * this.fireworks.height,
                    3,
                    3
                )
            })

            this.fireworks.engine.globalAlpha = 1
        }
    }

    pushSalve() {
        this.salve.push({
            x: 0,
            mx: -0.02 * Math.random() * 0.04,
            y: 1,
            ym: 0.05 + Math.random() * 0.5,
            c: rndColor(),
            cb: this._shot
        })
    }

    render() {

        this.t++

        if (this.t < this.tmax && (this.t % this.tmod) === 0) {
            this.pushSalve()
        }

        let rendered = false

        this.salve.forEach(salve => {

            if (salve.cb) {
                rendered = true
                salve.cb(salve)
            }

        })

        if (this.t > this.tmax) {
            return rendered
        }

        return true
    }
}

class Fireworks
{
    constructor() {
        this.canvas = canvas
        this.engine = ctx
        this.stacks = new Map()
        this.handler

        this.resize()
    }

    resize() {
        this.width  = window.innerWidth
        this.height = window.innerHeight

        this.canvas.setAttribute('width', this.width)
        this.canvas.setAttribute('height', this.height)
    }

    clear() {
        this.engine.clearRect(0, 0, this.width, this.height)
        this.engine.fillStyle = '#fff'
        this.engine.fillRect(0, 0, this.width, this.height)
    }

    addBattery() {
        const bat = new Battery(this)
        this.stacks.set(Date.now(), bat)
    }

    render() {

        if (Math.random() < 0.05) {
            this.addBattery()
        }

        this.clear()

        this.stacks.forEach((scene, key) => {

            const rendered = scene.render()

            if (!rendered) {
                this.stacks.delete(key)
            }
        });

        this.handler = requestAnimationFrame(this.render.bind(this))
    }

    run() {
        for(let i = 0; i < 7; i++) {
            this.addBattery()
        }
        window.addEventListener('resize', this.resize.bind(this))
        this.render()
    }

    stop() {
        cancelAnimationFrame(this.handler)
        this.clear()
    }
}

document.addEventListener('mouseup', () => documentMouseUp())
document.addEventListener('touchend', () => documentMouseUp())

document.addEventListener('mousemove', e => documentMouseMove(e))
document.addEventListener('touchmove', e => documentMouseMove(e))

document.addEventListener('mousedown', () => paintFlag = true)
document.addEventListener('touchstart', () => paintFlag = true)
