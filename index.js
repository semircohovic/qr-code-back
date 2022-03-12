require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
// const session = require("express-session");
// let redisStore=require("connec")

const InitiateMongoServer = require("./config/db.config");

InitiateMongoServer();

const router = require("./routes");

const app = express();

app.use(morgan("short"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api", router);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on: ${process.env.PORT}`);
});
