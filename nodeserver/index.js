const io=require("socket.io")(8000)
const user={}
io.on("connection",socket =>{
    socket.on("new-user-joined",name=>{
        console.log("new user joined")
        user[socket.id]=name;
        socket.broadcast.emit("user-joined",name);
    });
    socket.on("send",(message)=>{
        socket.broadcast.emit("recieve",{message:message,name:user[socket.id]})
    });
    
  socket.on('disconnect', function () {

    socket.broadcast.emit('disconnected',{name:user[socket.id]});
    

});
});
