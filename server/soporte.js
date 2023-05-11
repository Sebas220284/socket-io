const http=require('http')




3

const server= http.createServer()

const port = process.env.PORT || 4001;

const io=require('socket.io')(server,{
    cors:{origin:'*'}
})

io.on('connection',(socket)=>{
    console.log('se ha conectado un cliente')

    socket.broadcast.emit('chat_msj',{
        usuario:'INFO',
        mensaje:'Se ha conectado un nuevo usuario'
    })


socket.on('chat_msj',(data)=>{
  io.emit('chat_msj',data)
})

})

server.listen(port)
console.log('corriendo en el puerto '+port)