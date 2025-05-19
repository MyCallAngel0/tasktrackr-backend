const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const listRoutes = require('./routes/lists');
const taskRoutes = require('./routes/tasks');
const userRoutes = require('./routes/users');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/lists', listRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
  res.status(200).json({ message: 'TaskTrackr API' });
});

module.exports = app;