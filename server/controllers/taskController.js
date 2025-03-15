const mongoose = require('mongoose');
const Task = require('../models/TaskModel');

const getTasks = async (req, res) => {
    try {
        const userId = req.user.id;
        const tasks = await Task.find({ user: userId });
        res.status(200).json(tasks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

const addATask = async (req, res) => {
    
    
    try {
        const taskData = req.body;
       



        const newTask = new Task(taskData);
        await newTask.save();

        const allTasks = await Task.find({ user: req.user.id });
        res.status(201).json(allTasks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

const updateATask = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid task ID" });
        }

        const updatedTask = await Task.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedTask) {
            return res.status(404).json({ message: "Task not found" });
        }

        const allTasks = await Task.find({ user: req.user.id });
        res.status(200).json(allTasks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

const deleteATask = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid task ID" });
        }

        const deletedTask = await Task.findByIdAndDelete(id);
        if (!deletedTask) {
            return res.status(404).json({ message: "Task not found" });
        }

        const allTasks = await Task.find({ user: req.user.id });
        res.status(200).json({ success: true, tasks: allTasks });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

module.exports = { getTasks, addATask, updateATask, deleteATask };
