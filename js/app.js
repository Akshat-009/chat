const socket=io('http://localhost:8000')
console.log("working")
const form=document.getElementById("messageform")
const messageInput=document.getElementById("messagehold")
const messageContainer=document.querySelector(".container")
function append(message,position){
    messageelement=document.createElement("div")
    messageelement.innerHTML=message
    messageelement.classList.add("message")
    messageelement.classList.add(position)
    messageContainer.append(messageelement)
}
form.addEventListener("submit", function(e){
    e.preventDefault
   const  message=messageInput.value
    append(`${message}`,'right')
    socket.emit('send',message)
    messageInput.value=""
})
const name=prompt("Enter your name to join")
socket.emit("new-user-joined",name)
socket.on("user-joined",name => {
    append(`${name} joined the chat`,'right')
})
socket.on("recieve",data => {
    append(`${data.name}:${data.message}`,'left')
})

socket.on("disconnected",data => {

    append(`${data.name} is disconnected`,'left')
})
