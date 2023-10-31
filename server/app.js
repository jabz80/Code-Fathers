const express = require('express');
const cors = require('cors');

const noteRouter = require('./routers/note');
const taskRouter = require('./routers/tasks');
const userRouter = require('./routers/users');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('This is the notes API');
});

// Routes
app.use('/notes', noteRouter);
app.use('/tasks', taskRouter);
app.use('/users', userRouter);

module.exports = app;
