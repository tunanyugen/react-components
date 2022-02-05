const express = require("express");
const app = express();
const bodyParser = require("body-parser");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

app.use("/static", express.static(__dirname + "/demo"));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/demo/index.html");
})

app.listen(8001);