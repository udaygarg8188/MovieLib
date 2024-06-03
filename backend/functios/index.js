if(process.env.NODE_ENV !== 'production'){
  require('dotenv').config();
}
const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const cors = require("cors");
import ServerlessHttp from "serverless-http";
mongoose.connect(process.env.mongo_url);

const handler=ServerlessHttp(app);
app.use(express.json());
app.use(cors());



const UserSchema = new mongoose.Schema({
  name: String,

  email: { type: String, unique: true },

  password: String,

  date: { type: Date, default: Date.now },

  watchList: { type: [Object], default: [] },

  watched: { type: [Object], default: [] },
});

const User = mongoose.model('movie', UserSchema);

const fetchUser = async (req, res, next) => {
  const token = req.header('auth-token');
  if (!token) {
    return res.status(401).send({ errors: "Please authenticate using a valid token" });
  }
  try {
    const data = jwt.verify(token, process.env.secret);
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).send({ errors: "Please authenticate using a valid token" });
  }
};

app.post('/signup', async (req, res) => {
  let check = await User.findOne({ email: req.body.email });
  if (check) {
    return res.status(400).json({ success: false, error: "existing user found with same email address" });
  }
  const user = new User({
    name: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });

  await user.save();

  const data = {
    user: { id: user.id }
  };

  const token = jwt.sign(data, process.env.secret);
  res.json({ success: true, token });
});

app.post('/login', async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    const passCompare = req.body.password === user.password;
    if (passCompare) {
      const data = {
        user: { id: user.id }
      };
      const token = jwt.sign(data, process.env.secret);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, errors: "Wrong Password" });
    }
  } else {
    res.json({ success: false, errors: "Wrong Email Id" });
  }
});

app.get('/userLists', fetchUser, async (req, res) => {
  const user = await User.findById(req.user.id);
  res.json({ success: true, watchList: user.watchList, watched: user.watched });
});

app.post('/addMovieToWatchlist', fetchUser, async (req, res) => {
  const user = await User.findById(req.user.id);
  user.watchList.push(req.body.movie);
  await user.save();
  res.json(user.watchList);
});

app.delete('/removeMovieFromWatchlist/:id', fetchUser, async (req, res) => {
  const user = await User.findById(req.user.id);
  user.watchList = user.watchList.filter(movie => movie.id !== req.params.id);
  await user.save();
  res.json(user.watchList);
});

app.post('/addMovieToWatched', fetchUser, async (req, res) => {
  const user = await User.findById(req.user.id);
  user.watchList = user.watchList.filter(movie => movie.id !== req.body.movie.id);
  user.watched.push(req.body.movie);
  await user.save();
  res.json(user.watched);
});

app.post('/moveToWatchlist', fetchUser, async (req, res) => {
  const user = await User.findById(req.user.id);
  user.watched = user.watched.filter(movie => movie.id !== req.body.movie.id);
  user.watchList.push(req.body.movie);
  await user.save();
  res.json(user.watchList);
});

app.delete('/removeFromWatched/:id', fetchUser, async (req, res) => {
  const user = await User.findById(req.user.id);
  user.watched = user.watched.filter(movie => movie.id !== req.params.id);
  await user.save();
  res.json(user.watched);
});

app.listen(port, (error) => {
  if (!error) {
    console.log("Server Running on Port " + port);
  } else {
    console.log("Error : " + error);
  }
});

module.exports.handler =ServerlessHttp(app);