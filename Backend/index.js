const express = require("express");
const app = express();
app.use(express.json())
require("dotenv").config();

app.listen(process.env.PORT, (err) => {
    if (err) console.error(err)
    console.log(`Server is running on port `, process.env.PORT);
    require("./configs/db.config")
  });