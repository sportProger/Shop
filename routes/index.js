let express = require('express');
let nodeXLSX = require('node-xlsx')
let config = require('config')

let router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Авторизация' })
})

router.post('/', (req, res, next) => {
  let userIp = req.body.ip
  let userPassword = req.body.password
  let obj = nodeXLSX.parse('C:\\Users\\admin\\Documents\\WebProject\\App\\public\\database.xlsx')
  let ip, password

  obj.forEach(e => {
    ip = e.data[1][0]
    password = e.data[1][1]
  })

  if (userIp == ip && userPassword == password) {
    config.set('isAuthorized', true)
    res.send('Ok')
  }
  else {
    res.send('Bad')
  }

})
module.exports = router;
