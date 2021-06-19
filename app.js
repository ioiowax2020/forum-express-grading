const express = require('express')
const handlebars = require('express-handlebars')
const app = express()
const session = require('express-session')
const flash = require('connect-flash')
const passport = require('./config/passport')

const port = 3000
const db = require('./models') //引入資料庫



app.engine('handlebars', handlebars({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.urlencoded({ extended: true })) //解析req.body 來自使用者的請求

app.use(session({ secret: 'Minesecret', resave: false, saveUninitialized: false }))

app.use(passport.initialize())
app.use(passport.session())

app.use(flash())
// 把 req.flash 放到 res.locals 裡面
app.use((req, res, next) => {
  res.locals.success_messages = req.flash('success_messages')
  res.locals.error_messages = req.flash('error_messages')
  res.locals.user = req.user
  next()
})

app.listen(port, () => {
  console.log(`Example app listening on port${port}`)
})

require('./routes')(app, passport) //最後一行

module.exports = app
