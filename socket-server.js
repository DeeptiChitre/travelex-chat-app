var express=require("express");
var app=express();
var http=require("http");
var server=http.createServer(app);
var io=require("socket.io")(server);

io.on("connection",client=>{
    console.log("client connected"+client.id);
    client.emit("acknowledge","{message:'You are connected'}");
    client.on("msgToServer",(chatterName,msg)=>{
        console.log(chatterName+ " says "+msg);
        client.broadcast.emit('msgToServer',chatterName,msg);
        client.emit("servermsg","Me:",msg);
    })
})

app.get("/",(req,res)=>{
res.sendFile(__dirname+"/public/socket-client.html");
})

var port=process.env.PORT||3000;

server.listen(port,()=>{
    console.log("socket server running at port ",port);
})
