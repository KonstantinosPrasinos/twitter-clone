const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
const feedRoutes = require('./routes/feedRoutes');
const userRoutes = require('./routes/userRoutes');

const {appConfig,corsConfig} = require('./config/app-config');

const app = express();
const PORT = appConfig.port;

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({
  origin: corsConfig.allowedOrigins,
  allowedHeaders: corsConfig.allowedHeaders,
  credentials: corsConfig.credentials,
}));

app.use(authRoutes);
app.use(feedRoutes);

app.use(postRoutes);
app.use(userRoutes)

app.get("", (req, res) => {
    res.send("Hello world!");
});

app.listen(PORT,() => console.log(`Server started at: http://localhost:${PORT}`));