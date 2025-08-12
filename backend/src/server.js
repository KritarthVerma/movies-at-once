// Load environment variables from a .env file
import { config } from 'dotenv';

// Node.js utilities for handling file paths
import path from 'path';
import { fileURLToPath } from 'url';

// Core dependencies
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

// Database connection helpers
import { connectToDB, disconnectFromDB } from './db/connection.js';

// Route handlers
import movieRoutes from './routes/movieRoutes.js';
import commentRoutes from './routes/commentRoutes.js';
import userRoutes from './routes/userRoutes.js';

// Resolve current file and directory paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to the .env file (two levels up from this file)
const envPath = path.resolve(__dirname, '../../.env');
config({ path: envPath }); // Load .env configuration

// Define the port the server will run on
const PORT = process.env.PORT || 5000;

// Connect to MongoDB before starting the server
connectToDB()
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1); // Stop the app if DB connection fails
    });

const app = express();

// Enable CORS (Cross-Origin Resource Sharing)
app.use(cors());

// Parse incoming JSON requests
app.use(express.json());

// Mount route handlers
app.use("/movies", movieRoutes);
app.use("/comments", commentRoutes);
app.use("/users", userRoutes);

// Start listening for incoming HTTP requests
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
