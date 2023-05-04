const express = require("express");
const cors = require("cors");

const router = require("./router/routers.js");

const app = express();

app.use(express.json());
app.use(cors());
app.use("/", router);

app.listen(8080, () => {
  console.log("server is listening");
});
