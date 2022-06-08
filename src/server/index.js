const { PORT, NODE_ENV: ENV } = process.env
const server = require('./server')

server.listen(PORT, () => {
  console.table({ ENV, PORT })
})

require('./ws')