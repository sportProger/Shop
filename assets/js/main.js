function openCity(event, cityName) {
    let tabContent = document.querySelectorAll('.tab-content')
    let tabLinks = document.querySelectorAll('.tab__links')

    tabContent.forEach(e => e.style.display = 'none')
    tabLinks.forEach(e => e.className = e.className.replace('active', ''))

    document.getElementById(cityName).style.display = 'block'
    event.className += " active"
    console.log(event.className)
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
