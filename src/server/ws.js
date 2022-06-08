const server = require('./server')
const io = require('socket.io')(server)
const fs = require('fs')

const bot = JSON.parse(fs.readFileSync(__dirname + '/../bot.json'))

const getResponse = id => {
  return bot.response.filter(r => r.id === id)[0]
}

const getOptions = response => {
  const collection = []
  for (const id of response.options) {
    for (const option of bot.option) {
      if (option.id === id) {
        collection.push(option)
      }
    }
  }
  return collection
}

io.on('connection', socket => {
  
  const initialBotResponse = getResponse(1)

  socket.emit('bot-response', {
    response: initialBotResponse,
    options: getOptions(initialBotResponse)
  })

  socket.on('option-selected', id => {
    const response = getResponse(id)
    socket.emit('bot-response', {
      response,
      options: getOptions(response)
    })
  })

})