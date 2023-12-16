const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');
const appConfig = require('./config/app-config');

const app = express();
const PORT = appConfig.port;
app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());

app.use(authRoutes);
app.get("", (req, res) => {
    res.send("Hello world!");
});

app.listen(PORT,() => console.log(`Server started at: http://localhost:${PORT}`));