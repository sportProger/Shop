let express = require('express')
let router = express.Router()
let config = require('config')
let nodeXLSX = require('node-xlsx')
let fs = require('fs')

router.get('/', (req, res, next) => {
    if ( config.get('isAuthorized') ) {
        res.render('archive', {
            title: 'Архив'
        })
    }
    else {
        res.render('error', {
            title: 'Error 404',
            message: 'Страница не найдена',
            stat: '404'
        })
    }
})

router.post('/', (req, res, next) => {
    let obj = nodeXLSX.parse('C:\\Users\\admin\\Documents\\WebProject\\App\\public\\archive.xlsx')
    res.send( JSON.stringify(obj[0].data) )
})

module.exports = router
