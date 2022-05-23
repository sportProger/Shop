let D = document

function openCity(event, cityName) {
    let tabContent = document.querySelectorAll('.tab-content')
    let tabLinks = document.querySelectorAll('.tab__links')

    tabContent.forEach(e => e.style.display = 'none')
    tabLinks.forEach(e => e.className = e.className.replace('active', ''))

    document.getElementById(cityName).style.display = 'block'
    event.className += " active"
}

let tab_links = document.querySelectorAll('.tab__links')
tab_links.forEach(e => {
   e.addEventListener('click', () => {
       switch(e.innerHTML) {
           case "Актуальные": 
                openCity(e, "actual")
                break
            case "Не актуальные": 
                openCity(e, "not-actual")
                break
            case "Все": 
                openCity(e, "all")
                break
       }
   })
})

let exit = document.getElementById('exit')
exit.addEventListener('click',async () => {
    let response = await fetch('/main', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({exit: true})
    })

    let result = await response.text()

    if(result == 'Ok') {
        window.location.href = 'http://localhost:3000'
    }
})

function order(div1, number, clearDate, state, className) {
    let item = D.createElement('div')
    let item__number = D.createElement('p')
    let item__date = D.createElement('p')
    let status = D.createElement('p')

    item.addEventListener('click', async () => {
        let response = await fetch('/main', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                card: true,
                number: number
            })
        })

        let result = await response.text()
        console.log(result)
        if(result == 'Ok') {
            window.location.href = 'http://localhost:3000/card'
        }
    })

    item__number.innerText = number
    item__date.innerText = clearDate
    status.innerText = state

    item.classList.add('item')
    item.classList.add(className)
    item__number.classList.add('item__number')
    item__date.classList.add('item__date')
    status.classList.add('state')

    item.appendChild(item__number)
    item.appendChild(item__date)
    item.appendChild(status)
    div1.appendChild(item)
}

function createOrder(number, date, status) {
    let all = D.getElementById('all')
    let notActual = D.getElementById('not-actual')
    let actual = D.getElementById('actual')
    let clearDate = date.replaceAll('\"', '')

    switch (status) {
        case 'Актуален':
            order(actual, number, clearDate, status, 'item_actual')
            order(all, number, clearDate, status, 'item_actual')
            break
        case 'Выдан':
            order(notActual, number, clearDate, status, 'item_issued')
            order(all, number, clearDate, status, 'item_issued')
            break
        case 'Расформирован':
            order(notActual, number, clearDate, status, 'item_disbanded')
            order(all, number, clearDate, status, 'item_disbanded')
            break
    }
}

window.addEventListener('load', async () => {
    let response = await fetch('/main', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({load: true})
    })

    let result = await response.json()

    for (let x = 1; x <= result.length - 3; x++) {
        createOrder(result[x][1], result[x][2], result[x][3])
    }
})

let viewArchive = D.querySelector('#view-archive')
viewArchive.addEventListener('click', () => {
    window.location.href = 'http://localhost:3000/archive'
})
