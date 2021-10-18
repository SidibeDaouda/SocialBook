const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const socket = require("socket.io");
const userRoutes = require("./routes/user.routes");
const postRoutes = require("./routes/post.routes");
const messageRoutes = require("./routes/messages.routes");
const { checkUser, requireAuth } = require("./middleware/auth.middleware");
const app = express();
const conversationRoutes = require("./routes/conversations.routes");
require("dotenv").config({ path: "./config/.env" });
require("./config/db");

const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
  allowedHeaders: ["sessionId", "Content-Type"],
  exposedHeaders: ["sessionId"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// jwt
app.get("*", checkUser);
app.get("/jwtid", requireAuth, (req, res) => {
  res.status(200).send(res.locals.user._id);
});

// routes
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/conversations", conversationRoutes);

const server = app.listen(process.env.PORT, () => {
  console.log(
    `Le serveur a démarré sur le port ${process.env.PORT} => http://localhost:${process.env.PORT}`
  );
});

// socket.io
io = socket(server, { cors: { origin: "http://localhost:3000" } });
require("./socket/index")(io);
