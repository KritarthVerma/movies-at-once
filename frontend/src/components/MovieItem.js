import React from 'react';

const MovieItem = ({ movie }) => {
    const handleDownload = () => {
        // Logic to handle movie download
        window.open(movie.downloadLink, '_blank');
    };

    return (
        <div className="movie-item">
            <h3>{movie.title}</h3>
            <p>{movie.description}</p>
            <p>Category: {movie.category}</p>
            <p>Tags: {movie.tags.join(', ')}</p>
            <button onClick={handleDownload}>Download</button>
        </div>
    );
};

export default MovieItem;