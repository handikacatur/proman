const path = require('path');
const express = require('express');
const errorHandler = require('./middleware/error');
const colors = require('colors');

const app = express();

// ? Use express body parser
app.use(express.json());

// ? Import route files
const projects = require('./routers/projects');

// ? Mount routers
app.use('/projects', projects);

// ? Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, console.log(`Server is running on port ${PORT}`.green));

// Handle promise rejection
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`);
    server.close(() => {process.exit(1)});
});