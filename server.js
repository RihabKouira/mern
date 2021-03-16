const express = require("express");
const http = require("http");
const userRoutes = require("./routes/user_routes");
const postRoutes = require("./routes/post_routes");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
require("dotenv").config({ path: "./config/.env" });
const { checkUser, requireAuth } = require("./middelware/authMeddleware");
const app = express();

//connect DB
require("./config/db");
const mongoose = require("mongoose");
const connect = mongoose
  .connect(
    "mongodb+srv://" +
      process.env.DB_USER_PASS +
      "@checkpoint-users-mongoo.hlr29.mongodb.net/<dbname>?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    }
  )
  .then(() => console.log("DB is connected"))
  .catch((err) => console.log("Failed to connect our DB", err));

const server = require("http").createServer(app);

// cors
const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
  allowedHeaders: ["sessionId", "Content-Type"],
  exposedHeaders: ["sessionId"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
};
app.use(cors(corsOptions));

const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});
// const io = require("socket.io")(server);
//middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
//jwt
app.get("*", checkUser);
app.get("/jwtid", requireAuth, (req, res) => {
  res.status(200).send(res.locals.user._id);
});

const { Chat } = require("./models/chat");

/* routes*/
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);
app.use("/api/chat", require("./routes/chat"));


//multer
const multer = require("multer");
const fs = require("fs");
const { promisify } = require("util");

const pipeline = promisify(require("stream").pipeline);

 
var upload = multer()

app.post("/api/chat/uploadfiles", upload.single("file"), (req, res) => {


if (req.file !== null) {
  try {
    if (
      req.file.detectedMimeType != "image/jpg" &&
      req.file.detectedMimeType != "image/png" &&
      req.file.detectedMimeType != "image/jpeg"
    )
      throw Error("invalid file");

    if (req.file.size > 500000) throw Error("max size");
  } catch (err) {
    return res.status(201).json(err);
  }
  const fileName = Date.now()  + ".jpg";

 pipeline(
    req.file.stream,
    fs.createWriteStream(
      `${__dirname}/./client/public/uploads/msg/${fileName}`
    )
  );
  return res.json({ success: true, url: res.req.file !== null ? "./uploads/msg/" + fileName : ""});

}
});


//socket
io.on("connection", (socket) => {
  socket.on("Input Chat Message", (msg) => {
    connect.then((db) => {
      try {
        let chat = new Chat({
          message: msg.chatMessage,
          sender: msg.userId,
          senderimg: msg.userImage,
          sendername: msg.userName,
          type: msg.type,
        });

        chat.save((err, doc) => {
          console.log(doc);
          if (err) return res.json({ success: false, err });

          Chat.find({ _id: doc._id })
            // .populate("sender")
            .exec((err, doc) => {
              return io.emit("Output Chat Message", doc);
            });
        });
      } catch (error) {
        console.error(error);
      }
    });
  });
});
app.use('/uploads', express.static('uploads'));
/* create server */
server.listen(process.env.PORT, (err) => {
  if (err) console.log(err);
  else console.log(`Server running on port ${process.env.PORT}`);
});
