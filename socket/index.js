const io = require("socket.io")(4040, {
  cors: {
    origin: "http://localhost:5555",
  },
});

io.on("connection", (socket) => {
  console.log("user Connected");

  socket.on("disconnect", () => {
    console.log("a user disconnected");
  });
});
