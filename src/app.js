const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const yaml = require('yamljs');
const authRoutes = require('./routes/auth');
const listRoutes = require('./routes/lists');
const taskRoutes = require('./routes/tasks');
const userRoutes = require('./routes/users');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Swagger UI
const swaggerDocument = yaml.load('./src/swagger.yaml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/lists', listRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
  res.status(200).json({ message: 'TaskTrackr API' });
});

module.exports = app;