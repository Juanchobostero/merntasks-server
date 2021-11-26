const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const auth = require('../middleware/auth');
const { check } = require('express-validator');


// Create a task
// api/tasks
router.post('/',
    auth,
    [
        check('name', 'The name is required !').not().isEmpty(),
        check('proyect', 'The proyect is required !').not().isEmpty()
    ],
    taskController.createTask
);

// Gets tasks for proyect
router.get('/',
    auth,
    taskController.getTasks
);

// Update task
router.put('/:id',
    auth,
    taskController.updateTask
);

// Delete task
router.delete('/:id',
    auth,
    taskController.deleteTask
);

module.exports = router;