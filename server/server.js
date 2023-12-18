const express = require("express");
const bodyParser = require("body-parser");
const path = require('path');
const authRoutes = require('./routes/authRoutes');
const appConfig = require('./config/app-config');
const cors = require('cors');

const app = express();
const PORT = appConfig.port;

// In order to be able to accept requests from front end in dev server
const corsOptions = {
    origin: true
}

app.use(cors(corsOptions));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.use('/auth', authRoutes);

app.listen(PORT,() => console.log(`Server started at: http://localhost:${PORT}`));