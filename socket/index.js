let users = [];

const addUser = (id, socketId) => {
  !users.some((user) => user.id === id) && users.push({ id, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (id) => {
  return users.find((user) => user.id === id);
};

module.exports = (io) => {
  io.on("connection", (socket) => {
    //when ceonnect
    console.log("a user connected.");
    socket.emit("msg", "bonjour");
    //take id and socketId from user
    socket.on("addUser", (id) => {
      addUser(id, socket.id);
      io.emit("getUsers", users);
    });

    //send and get message
    socket.on("sendMessage", ({ senderId, receiverId, text }) => {
      const user = getUser(receiverId);
      io.to(user.socketId).emit("getMessage", {
        senderId,
        text,
      });
    });

    //when disconnect
    socket.on("disconnect", () => {
      console.log("a user disconnected!");
      removeUser(socket.id);
      io.emit("getUsers", users);
    });
  });
};
