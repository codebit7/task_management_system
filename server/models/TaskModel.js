const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({

  user:{type: mongoose.Schema.Types.ObjectId  , ref : "User", required: true },
  id: {
    type: String,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
    default: 'Low'
  },
  date: {
    type: Date,
    required: true
  },
  taskCompleted: {
    type: String,
    enum: ['Yes', 'No'],
    default: 'No'
  },
  status: {
    type: String,
    enum: ['In Progress', 'Completed'],
    default: 'In Progress'
  }
}, {timestamps:true});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
