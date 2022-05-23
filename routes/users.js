let express = require('express')
let router = express.Router()
let config = require('config')
const nodeXLSX = require("node-xlsx");

/* GET users listing. */
router.get('/', (req, res, next) => {
  if ( config.get('isAuthorized') ) {
    res.render('main', {
      title: 'Заказы'
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
  if (req.body.exit) {
    config.set('isAuthorized', false)
    res.send('Ok')
  }
  else if (req.body.load) {
    let obj = nodeXLSX.parse('C:\\Users\\admin\\Documents\\WebProject\\App\\public\\orders.xlsx')
    res.send( JSON.stringify(obj[0].data) )
  }
  else if(req.body.card) {
    config.set('cardNumber', req.body)
    res.send('Ok')
  }
})

module.exports = router
