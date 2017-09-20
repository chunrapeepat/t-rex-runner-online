const express = require('express')
const path = require('path')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)

const GameServer = require('./game-server')
const game = new GameServer

// game socket
io.on('connection', (socket) => {

  socket.on('new connection', data => {
    const user_id = data.split('~')[0]
    const username = data.split('~')[1]
    game.newConnection(user_id, username)
  })

  socket.on('set highscore', data => {
    const user_id = data.split('~')[0]
    const score = parseInt(data.split('~')[1])
    game.setHighScore(user_id, score)
  })

  socket.on('x position', data => {
    const user_id = data.split('~')[0]
    const xPos = parseInt(data.split('~')[1])
    game.setxPosition(user_id, xPos)
  })

  socket.on('remove x position', user_id => {
    game.removexPosition(user_id)
  })

  socket.on('jumping', user_id => {
    socket.broadcast.emit('jumping', user_id)
  })

})

app.get('/api/xpos', (req, res) => {
  res.send(JSON.stringify(game.getxPosition))
})

// serve static file
app.use('/', express.static(path.join(__dirname, 'public')))

// defined application running port
server.listen(3000, () => console.log('> Running on port 3000'))
