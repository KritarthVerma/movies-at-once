// Import Mongoose library for MongoDB object modeling
import mongoose from "mongoose";

// Define schema for the Comment collection
const commentSchema = new mongoose.Schema({
  // Reference to the movie this comment belongs to
  movie: { 
    type: mongoose.Schema.Types.ObjectId, // Stores the ID of a Movie document
    ref: "Movie",                         // References the "Movie" model
    required: true                        // Must be provided
  },
  // Reference to the user who wrote the comment
  user: { 
    type: mongoose.Schema.Types.ObjectId, // Stores the ID of a User document
    ref: "User",                          // References the "User" model
    required: true                        // Must be provided
  },
  // The actual text content of the comment
  text: { 
    type: String,                         // Comment text
    required: true                        // Cannot be empty
  }
}, { 
  // Automatically add `createdAt` and `updatedAt` timestamps
  timestamps: true 
});

// Export the Comment model so it can be used throughout the application
export default mongoose.model("Comment", commentSchema);
