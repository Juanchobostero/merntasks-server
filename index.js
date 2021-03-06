const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

// Create the server
const app = express();

// Connect to db
connectDB();

// Allow Cors
app.use(cors({ credentials: true, origin: true }));
app.options("*", cors());


// express.json
app.use( express.json({ extended: true }) );

// App Port
const port = process.env.PORT || 4000;

//import routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/proyects', require('./routes/proyects'));
app.use('/api/tasks', require('./routes/tasks'));

// Start the app
app.listen(port, '0.0.0.0', () => {
    console.log(`The server is working in the port: ${port}`);
}); 



