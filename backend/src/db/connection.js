// Import Mongoose library for MongoDB object modeling
import mongoose from 'mongoose';

/**
 * Connect to MongoDB using the connection string from environment variables
 */
async function connectToDB() {
    try {
        // Attempt to establish a connection to MongoDB
        await mongoose.connect(process.env.MONGODB_URL);
    } catch (error) {
        // Log the error and throw a custom error message if connection fails
        console.log(error);
        throw new Error("Cannot connect to mongodb");
    }
}

/**
 * Disconnect from MongoDB
 */
async function disconnectFromDB() {
    try {
        // Attempt to close the existing MongoDB connection
        await mongoose.disconnect();
    } catch (error) {
        // Log the error and throw a custom error message if disconnection fails
        console.log(error);
        throw new Error("Could not disconnect from mongodb");
    }
}

// Export both functions for use in other parts of the application
export { connectToDB, disconnectFromDB };
