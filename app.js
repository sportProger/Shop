let express = require('express')
let path = require('path')
let cookieParser = require('cookie-parser')
let logger = require('morgan')
let config = require('config')

// здесь подключаем библиотеки (express path cookie-parser morgan) и также подключаем конфигурационный файл

let indexRouter = require('./routes/index')
let usersRouter = require('./routes/users')
let cardRouter = require('./routes/card')
let archiveRouter = require('./routes/archive')

// подключаем основные backend scpripts главных страниц

let app = express() //initialization библиотеки express

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// подключение ejs шаблонов и шаблонизатор

app.use(logger('dev')) // подключаем логирование в режиме разработки
app.use(express.json()) // подкл обработку запросов json запросов
app.use(express.urlencoded({ extended: false })) // разрешаем принимать post  и get запросы
app.use(cookieParser()) // подкл cookieParser
app.use(express.static(path.join(__dirname, 'public')))// подлючаеем assets файлы

app.use('/', indexRouter)
app.use('/main', usersRouter)
app.use('/card', cardRouter)
app.use('/archive', archiveRouter)

// подключаем маршруторизацию

app.listen(config.get('port'))// указываем порт 3000

module.exports = app
//-здесь мы экспортируем модуль