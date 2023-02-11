const io = require("socket.io")(4040, {
  cors: {
    origin: "http://localhost:3000",
  },
});

let users = [];
//!============== add connected user to users==========
const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

//!=============== remove offline  from users=========
const removeUser = (socketId) => {
  console.log(socketId);
  users = users.filter((user) => user.socketId !== socketId);
};
//!=============== get reciverId from users=========

const getUser = (userId) => {
  console.log(users);
  return users.find((user) => user.userId === userId);
};

//!========= connect to socket server=========
io.on("connection", (socket) => {
  console.log("user Connected");

  //=======take userId and socket id=======
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });

  //=======send and recive message=======
  socket.on("sendMessage", ({ senderId, reciverId, text }) => {
    console.log(reciverId);
    let user = getUser(reciverId);
    console.log(senderId, reciverId, text);
    console.log(user);
    if (user) {
      io.to(user.socketId).emit("getMessage", {
        senderId,
        text,
      });
    }
  });

  //=======disconect from socket=======
  socket.on("disconnect", () => {
    console.log("a user disconnected");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});
