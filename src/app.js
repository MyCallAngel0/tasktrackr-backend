const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const listRoutes = require('./routes/lists');
const taskRoutes = require('./routes/tasks');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/lists', listRoutes);
app.use('/api/tasks', taskRoutes);

app.get('/', (req, res) => {
  res.status(200).json({ message: 'SimplyDone API' });
});

module.exports = app;