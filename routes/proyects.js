const express = require('express');
const router = express.Router();
const proyectController = require('../controllers/proyectController');
const auth = require('../middleware/auth');
const { check } = require('express-validator');

// Creates proyects
// api/proyects
router.post('/',
    auth,
    [
        check('name', 'The proyect name is required !').not().isEmpty()
    ],
    proyectController.createProyect
);

// Gets all proyects
router.get('/',
    auth,
    proyectController.getProyects
);

// Updates a proyect
router.put('/:id',
    auth,
    [
        check('name', 'The proyect name is required !').not().isEmpty()
    ],
    proyectController.updateProyect
);

// Deletes a proyect
router.delete('/:id',
    auth,
    proyectController.deleteProyect
)

module.exports = router;