const Proyect = require('../models/Proyect');
const { validationResult } = require('express-validator');

exports.createProyect = async (req, res) => {

    // Check if there errors
    const errors = validationResult(req);
    if( !errors.isEmpty() ) {
        return res.status(400).json({ errors: errors.array() })
    }

    try {
        // Create a new proyect
        const proyect = new Proyect(req.body);

        // Save the creator with JWT
        proyect.owner = req.user.id;

        // Save the proyect
        proyect.save();
        res.json(proyect);

    } catch (error) {
        console.log(error);
        res.status(500).send('There was an error');
    }
}

// Gets all the proyects of the current user
exports.getProyects = async (req, res) => {
    try {
        const proyects = await Proyect.find({ owner: req.user.id }).sort({ created: -1 });
        res.json({ proyects });
    } catch (error) {
        console.log(error);
        res.status(500).send('There was an error !');
    }
}

// Updates a proyect
exports.updateProyect = async (req, res) => {

    // Check if there errors
    const errors = validationResult(req);
    if( !errors.isEmpty() ) {
        return res.status(400).json({ errors: errors.array() })
    }

    // Extract proyect info
    const { name } = req.body;
    const newProyect = {};

    if(name) {
        newProyect.name = name;
    }

    try {
        // Check the proyect id
        let proyect = await Proyect.findById(req.params.id);

        // if proyect exists or not
        if(!proyect) {
            res.status(404).json({ msg: 'Proyect not found !' });
        }

        // check the proyect owner
        if(proyect.owner.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Unauthorized !' });
        }

        // update proyect
        proyect = await Proyect.findByIdAndUpdate({ _id: req.params.id }, { $set: newProyect }, { new: true });
        res.json({ proyect });
    } catch (error) {
        console.log(error);
        res.status(500).send('Error in the server !');
    }
}

// Deletes a proyect 
exports.deleteProyect = async (req, res) => {
    try {
        // Check the proyect id
        let proyect = await Proyect.findById(req.params.id);

        // if proyect exists or not
        if(!proyect) {
            res.status(404).json({ msg: 'Proyect not found !' });
        }

        // check the proyect owner
        if(proyect.owner.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Unauthorized !' });
        }

        // Delete the proyect
        await Proyect.findOneAndRemove({ _id: req.params.id });
        res.json({ msg: 'Proyect deleted !' })

    } catch (error) {
        console.log(error);
        res.status(500).send('Error in the server !');
    }
}