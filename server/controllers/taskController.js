const mongoose = require('mongoose');
const Task = require('../models/TaskModel');

const getTasks = async (req, res) => {
    try {
        
        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: "Unauthorized - No user found" });
        }

        const userId = req.user.id;
        
        
        let tasks = await Task.find({ user: userId });
        
        if (!tasks || tasks.length === 0) {
            return res.status(200).json([]);
        }

        const currentDate = new Date();
        
        
        tasks = await Promise.all(tasks.map(async (task) => {
            try {
                
                const taskDate = new Date(task.date);
                
                if (task.taskCompleted === 'No' && currentDate > taskDate) {
                    if (task.status !== 'Overdue') {
                        task.status = 'Overdue';
                        await task.save();
                    }
                }
                return task;
            } catch (taskError) {
                console.error("Error processing task:", task._id, taskError);
                return task; 
            }
        }));

        res.status(200).json(tasks);
    } catch (error) {
        console.error("Error in getTasks:", error);
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
