import { config } from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url'
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { connectToDB, disconnectFromDB } from './db/connection.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envPath = path.resolve(__dirname, '../../.env'); // Move up two levels
config({ path: envPath }); //.env configuration

const PORT = process.env.PORT || 5000;

connectToDB().then(() => {
    console.log("Connected to MongoDB");
}).catch((error) => {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
});

const app = express();
app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});