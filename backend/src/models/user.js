// Import Mongoose library for MongoDB object modeling
import mongoose from "mongoose";

// Define schema for the User collection
const userSchema = new mongoose.Schema({
  // Unique username for the user
  username: { 
    type: String, 
    required: true,  // Cannot be empty
    unique: true     // Must be unique in the database
  },
  // User's email address
  email: { 
    type: String,
    required: true,  // Cannot be empty
    unique: true     // Must be unique in the database
  },
  // Hashed password for authentication
  password: { 
    type: String, 
    required: true   // Cannot be empty
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other", "Prefer not to say"], // restrict allowed values
    default : "Prefer not to say" // Default value if not specified
  },  
  // User's profile picture URL
  profilePicture: { 
    type: String,
    default: "https://example.com/default-profile.png" // Default profile picture URL
  },
  // List of movies the user has rated
  ratedMovies: [
    {
      // Reference to the Movie being rated
      movie: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Movie" 
      },
      // The rating value given by the user (1 to 5 stars)
      rating: { 
        type: Number,
        min: 1,   // Minimum rating allowed
        max: 5    // Maximum rating allowed
      }
    }
  ]
}, { 
  // Automatically manage `createdAt` and `updatedAt` timestamps
  timestamps: true 
});

// Export the User model for use in other parts of the app
export default mongoose.model("User", userSchema);
