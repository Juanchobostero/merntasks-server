const Task = require('../models/Task');
const Proyect = require('../models/Proyect');
const { validationResult } = require('express-validator');

// Creates a new task
exports.createTask = async (req, res) => {
    // Check if there errors
    const errors = validationResult(req);
    if( !errors.isEmpty() ) {
        return res.status(400).json({ errors: errors.array() })
    }

    try {
        // Extract the proyect and check if exists
        const { proyect } = req.body;
        const existsProyect = await Proyect.findById(proyect);
        if(!existsProyect) {
            return res.status(404).json({ msg: 'Proyect not found !' });
        }

        // check if current proyect belongs to authenticated user
        if(existsProyect.owner.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Unauthorized !' });
        }

        // Create the task
        const task = new Task(req.body);
        await task.save();
        res.json({ task });

    } catch (error) {
        console.log(error);
        res.status(500).send('There was an error');
    }
}

// Gets tasks for proyect
exports.getTasks = async (req, res) => {
    try {
        // Extract the proyect and check if exists
        const { proyect } = req.query;

        const existsProyect = await Proyect.findById(proyect);
        
        if(!existsProyect) {
            return res.status(404).json({ msg: 'Proyect not found !' });
        }

        // check if current proyect belongs to authenticated user
        if(existsProyect.owner.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Unauthorized !' });
        }

        // Get the tasks for proyect
        const tasks = await Task.find({ proyect }).sort({ created: -1 });
        res.json({ tasks });

    } catch (error) {
        console.log(error);
        res.status(500).send('There was an error !');
    }
}

// Update a task
exports.updateTask = async (req, res) => {

    try {
        // Extract the proyect and check if exists
        const { proyect, name, completed } = req.body;

        // Check if task exist or not
        let task = await Task.findById(req.params.id);

        if(!task) {
            return res.status(404).json({ msg: 'Task not found !' });
        }

        //  Extract proyect
        const existsProyect = await Proyect.findById(proyect);

        // check if current proyect belongs to authenticated user
        if(existsProyect.owner.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Unauthorized !' });
        }

        // Create an object with the new information
        const newTask = {};
        newTask.name = name;
        newTask.completed = completed;

        // Save the task
        task = await Task.findByIdAndUpdate({ _id: req.params.id }, newTask, { new: true });
        res.json({ task });

    } catch (error) {
        console.log(error);
        res.status(500).send('There was an error !');
    }
}

// Delete a task
exports.deleteTask = async (req, res) => {
    try {
        // Extract the proyect and check if exists
        // For requests from frontend(use req.query)
        // For requests from backend (p.e postman) (use req.body)
        const { proyect } = req.query;

        // Check if task exist or not
        let task = await Task.findById(req.params.id);

        if(!task) {
            return res.status(404).json({ msg: 'Task not found !' });
        }

        //  Extract proyect
        const existsProyect = await Proyect.findById(proyect);

        // check if current proyect belongs to authenticated user
        if(existsProyect.owner.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Unauthorized !' });
        }

        // Delete a task
        await Task.findOneAndRemove({ _id: req.params.id });
        res.json({ msg: 'Task deleted !' });
    } catch (error) {
        console.log(error);
        res.status(500).send('There was an error !');
    }
}