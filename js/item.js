let
    D = document,
    exit = D.getElementById('exit'),
    archive = D.getElementById('archive-btn'),
    printBtn = D.getElementById('print-btn'),
    printFlag = false

exit.addEventListener('click',async () => {
    let response = await fetch('/card', {
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

printBtn.addEventListener('click', () => {
    let buttons = D.querySelector('.buttons')
    if (!printFlag) {
        buttons.classList.add('hidden')
    }
    else {
        buttons.classList.remove('hidden')
    }
    window.print()
})

archive.addEventListener('click', async () => {
    let array = []
    let itemsData = D.querySelectorAll('.item__data')
    let itemDescription = D.querySelector('.item__description')
    itemsData.forEach(item => {
        array.push(item.innerText)
    })
    let orderData = {
        number: array[0],
        date: array[1],
        status1: array[2],
        name: array[3],
        phone: array[4],
        way: array[5],
        status2: array[6],
        description: itemDescription.innerText,
        price: array[7],
    }
    console.log(orderData)
    alert('Заказ добавлен в архив')
    let response = await fetch('/card', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderData)
    })
})