const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://"+ process.env.DB_USER_PASS +"@checkpoint-users-mongoo.hlr29.mongodb.net/<dbname>?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    }
  )
  .then(() => console.log("DB is connected"))
  .catch((err) => console.log("Failed to connect our DB", err));
