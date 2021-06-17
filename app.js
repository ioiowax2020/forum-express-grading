const express = require('express')
const handlebars = require('express-handlebars')
const app = express()
const port = 3000
const db = require('./models') //引入資料庫

app.engine('handlebars', handlebars({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.urlencoded({ extended: true })) //解析req.body 來自使用者的請求


app.listen(port, () => {
  console.log(`Example app listening on port${port}`)
})

require('./routes')(app) //最後一行

module.exports = app
