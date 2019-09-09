// 多对多聊天室服务器
// 创建WEB服务器
var app = require("http").createServer();
// 创建IO对象
var io = require("socket.io")(app);
// 绑定监听端口4000
app.listen(4000);
// 追寻变量clientCount 客户数量
var clientCount = 0;
var names=["亮亮","然然","东东","涛涛"]
//为IO绑定客户连接事件，connection
io.on("connection", (socket) => {
   clientCount++;
   // console.log(clientCount);
   if(clientCount<=4){
   var nickname = names[clientCount-1];
   //新人进入，发送广播给所有客户端
   io.emit("enter", "欢迎" + nickname + "加入聊天室");
}else{var nickname = "user: " + clientCount;}
   socket.on("message", (data) => {
      io.emit("list", nickname + " say: " + data);
   })
   //  接收客户消息，离开
   socket.on("disconnect", (data) => {
      io.emit("over",nickname + "离开聊天室，再见！")
   })
});