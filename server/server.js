const express = require("express");
const bodyParser = require("body-parser");
const path = require('path');
const authRoutes = require('./routes/authRoutes');
const appConfig = require('./config/app-config');

const app = express();
const PORT = appConfig.port;
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.json());

app.get("", (req, res) => {
    res.send("Hello world!");
});

app.listen(PORT,() => console.log(`Server started at: http://localhost:${PORT}`));