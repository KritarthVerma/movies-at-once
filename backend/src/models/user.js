const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    ratings: [{
        movieId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Movie'
        },
        rating: {
            type: Number,
            min: 1,
            max: 5
        }
    }]
});

module.exports = mongoose.model('User', userSchema);