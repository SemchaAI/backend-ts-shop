require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const cookie = require('cookie-session');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const router = require('./router/index');
const errorMiddleware = require('./middleware/error');

const path = require('path');
const PORT = process.env.PORT || 5000;
const app = express();
const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

const sessionConfig = {
  secret: 'MYSECRET',
  name: 'backend-ts-shop',
  resave: false,
  saveUninitialized: false,
  maxAge: 1000 * 60 * 15,
  cookie: {
    sameSite: 'none',
    secure: true,
  },
};

app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'static')));
app.use(fileUpload({}));
app.use(cookieParser());
app.use(cookie(sessionConfig));
app.use(cors(corsOptions));
app.use('/api', router);
app.use(errorMiddleware);

const start = async () => {
  try {
    await mongoose.connect(process.env.DB, {});
    app.listen(PORT, () => {
      console.log(`Listening on port ${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
};

start();
