let express = require('express')
let router = express.Router()
let config = require('config')
let nodeXLSX = require('node-xlsx')
let fs = require('fs')

router.get('/', (req, res, next) => {
    if ( config.get('isAuthorized') ) {
        let obj = nodeXLSX.parse('C:\\Users\\admin\\Documents\\WebProject\\App\\public\\clients.xlsx')
        let promise = new Promise(resolve=> {
            for (let x = 1; x <= obj[0].data.length - 1; x++) {
                if (obj[0].data[x][0] == config.get('cardNumber').number) {
                    console.log(obj[0].data[x][0], config.get('cardNumber').number)
                    resolve(x)
                    break
                }
            }
        })

        promise.then(fulfilled => {
            console.log(fulfilled, obj[0].data[fulfilled])
            res.render('card', {
                title: 'Товар',
                number: obj[0].data[fulfilled][0],
                date: obj[0].data[fulfilled][1].replaceAll('\"', ''),
                status1: obj[0].data[fulfilled][2],
                name: obj[0].data[fulfilled][3],
                phone: obj[0].data[fulfilled][4],
                way: obj[0].data[fulfilled][5],
                status2: obj[0].data[fulfilled][6],
                description: obj[0].data[fulfilled][7],
                price: obj[0].data[fulfilled][8],
            })
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

    if (req.body.exit === undefined) {
        let
            path = __dirname.replace('\\routes', '') + '\\public\\archive.xlsx',
            parseFile = nodeXLSX.parse(fs.readFileSync(path))

        let list = []

        console.log(parseFile[0].data, ' - parseData')

        for (let x = 0; x <= parseFile[0].data.length - 1; x++) {
            list.push(parseFile[0].data[x])
        }

        list.push(
            [
                req.body.number,
                req.body.date,
                req.body.status1,
                req.body.name,
                req.body.phone,
                req.body.way,
                req.body.status2,
                req.body.description,
                req.body.price,
            ]
        )

        console.log(list, ' - list')

        let sheetOptions = {'!cols': [{wch: 30}, {wch: 30}, {wch: 30}, {wch: 30}]}
        let buffer = nodeXLSX.build(
            [
                {
                    name: 'archive',
                    data: list
                }
            ],
            {sheetOptions}
        )

        fs.writeFile(path, buffer, (err) => {
            console.log(err)
        })
    }
})

module.exports = router
