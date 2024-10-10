const mongoose = require("mongoose");

//user schema

mongoose.connect(
  "mongodb+srv://nikhildelhi8:Nikhim%4090@cohertcluster.gg9qaxh.mongodb.net/TodoApp"
);

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minLength: 3,
    maxLength: 30,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  firstName: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    maxLength: 50,
  },
  lastName: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    maxLength: 50,
  },
  todos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Todo",
    },
  ],
});

//creating model

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  deadLineDate: {
    type: Date,
    default: false,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Todo = mongoose.model("Todo", schema);

const User = mongoose.model("User", userSchema);

module.exports = { User, Todo };
