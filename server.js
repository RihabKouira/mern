const express = require("express");
const userRoutes= require('./routes/user_routes');
const bodyParser= require('body-parser')
require("dotenv").config({ path: "./config/.env" });
//connect DB
require("./config/db");
const app = express();
//middleware
app.use(express.json())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))
/* routes*/
app.use("/api/user", userRoutes);

/* create server */
app.listen(process.env.PORT, (err) => {
  if (err) console.log(err);
  else console.log(`Server running on port ${process.env.PORT}`);
});
