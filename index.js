const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

// Create the server
const app = express();

// Connect to db
connectDB();

// Allow Cors
app.use(cors());

// express.json
app.use( express.json({ extended: true }) );

// App Port
const PORT = process.env.PORT || 4000;

//import routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/proyects', require('./routes/proyects'));
app.use('/api/tasks', require('./routes/tasks'));

// Start the app
app.listen(PORT, () => {
    console.log(`The server is working in the port: ${PORT}`);
}); 



