const express = require('express')
const app = express()

app.set('view engine', 'ejs')
app.set('views', __dirname + '/../views')

app.use(express.static(__dirname + '/../public'))

app.get('/', (req, res) => {
  res.render('home', {
    botName: 'Baxi'
  })
})

module.exports = app