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
    data: Buffer,      // Stores file data
    contentType: String, // Stores file type (e.g., image/png)
  },
  background : {
    data: Buffer,      // Stores file data
    contentType: String, // Stores file type (e.g., image/png)
  },
  // Direct download link for the movie
  downloadLink: { 
    type: String,
    required: true // Must provide a download link
  },
  // Average rating of the movie (0–5)
  ratingsCount: {
    1: { type: Number, default: 0 },
    2: { type: Number, default: 0 },
    3: { type: Number, default: 0 },
    4: { type: Number, default: 0 },
    5: { type: Number, default: 0 },
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
  },
  category: { 
    type: String,
    required: true 
  },  // e.g., "Action", "Comedy"
  tags: { 
    type: [String],
    default: [],
    required: true // Tags for categorization (e.g., "Thriller", "Drama")
  }  
}, { 
  // Automatically manage `createdAt` and `updatedAt` timestamps
  timestamps: true 
});

// Export the Movie model for use in other parts of the app
export default mongoose.model("Movie", movieSchema);
