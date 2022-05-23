let
    enter = document.getElementById('enter'),
    ip = document.getElementById('ip'),
    password = document.getElementById('password')

enter.addEventListener('click', async () => {
    if (ip.value !== "" || password.value !== "") {
        // Send data
        let user = {
            ip: ip.value,
            password: password.value
        }

        let response = await fetch('/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })

        let result = await response.text();
        if (result == 'Ok') {
            window.location.href = 'http://localhost:3000/main'
        }
        else {
            alert('Пользователь не найден')
        }

    } else {
        alert("Вы не ввели данные")
    }
})