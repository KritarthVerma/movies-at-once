import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MovieItem from './MovieItem';
import SearchBar from './SearchBar';
import FilterBar from './FilterBar';

const MovieList = () => {
    const [movies, setMovies] = useState([]);
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await axios.get('/api/movies');
                setMovies(response.data);
                setFilteredMovies(response.data);
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        };

        fetchMovies();
    }, []);

    useEffect(() => {
        const results = movies.filter(movie =>
            movie.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (selectedCategory ? movie.category === selectedCategory : true)
        );
        setFilteredMovies(results);
    }, [searchTerm, selectedCategory, movies]);

    return (
        <div>
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <FilterBar selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
            <div className="movie-list">
                {filteredMovies.map(movie => (
                    <MovieItem key={movie._id} movie={movie} />
                ))}
            </div>
        </div>
    );
};

export default MovieList;