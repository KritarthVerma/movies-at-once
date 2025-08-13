// Import Mongoose library for MongoDB object modeling
import mongoose from "mongoose";

// Define schema for the Movie collection
const movieSchema = new mongoose.Schema({
  // Title of the movie
  title: { 
    type: String,
    required: true // Title is mandatory
  },
  // Description of the movie
  description: { 
    type: String,
    required: true // Description is mandatory
  },
  // URL of the movie poster image
  poster: { 
    type: String,
    required: true // Must provide a poster image URL
  },
  background : {
    type: String,
    required: true // Must provide a background image URL
  },
  // Direct download link for the movie
  downloadLink: { 
    type: String,
    required: true // Must provide a download link
  },
  // Average rating of the movie (0–5)
  rating: { 
    type: Number, 
    default: 0 // Starts with 0 until ratings are given
  },
  // Total number of reviews submitted for the movie
  totalReviews: { 
    type: Number, 
    default: 0
  },
  // Array of ObjectIds referencing comments related to this movie
  comments: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Comment" // Links to Comment model
  }],
  downloads : {
    type: Number,
    default: 0 // Tracks how many times the movie has been downloaded
  }
}, { 
  // Automatically manage `createdAt` and `updatedAt` timestamps
  timestamps: true 
});

// Export the Movie model for use in other parts of the app
export default mongoose.model("Movie", movieSchema);
