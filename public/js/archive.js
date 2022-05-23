let D = document

function showTable(array) {
    let table = D.getElementById('table')

    array.forEach(row => {
        let tr = D.createElement('tr')
        row.forEach(cell => {
            let td = D.createElement('td')
            td.innerText = cell
            tr.appendChild(td)
        })
        table.appendChild(tr)
    })
}

window.onload = async () => {
    let response = await fetch('/archive', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: ''
    })

    let result = await response.json()
    showTable(result)
}