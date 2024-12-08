import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import routes from './routes/index.js';
import { Sequelize } from 'sequelize';

const sequelize: Sequelize = new Sequelize(process.env.DATABASE_URL || '', {
  dialect: 'postgres',
  protocol: 'postgres',
  logging: false,
});

const app = express();

// Port configuration - Render will provide the port, fallback to 3001 locally
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Middleware
app.use(cors()); // Allow cross-origin requests (optional, useful for frontend-backend)
app.use(express.static('../client/dist')); // Serve static files for the client
app.use(express.json()); // Parse incoming JSON requests
app.use(routes); // Use the routes defined in the routes/index.js

// Database sync and server startup
const forceDatabaseRefresh = false; // Set to true if you want to drop tables on every restart

// Sync Sequelize with the database and start the server
sequelize.sync({ force: forceDatabaseRefresh })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

