import mongoose from 'mongoose';

async function connectToDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
    } catch (error) {
        console.log(error);
        throw new Error("Cannot connect to mongodb");
    }
}

async function disconnectFromDB() {
    try {
        await mongoose.disconnect();
    } catch (error) {
        console.log(error);
        throw new Error("Could not disconnect from mongodb");
    }
}

export { connectToDB, disconnectFromDB }