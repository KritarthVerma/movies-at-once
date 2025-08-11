import React from 'react';

const FilterBar = ({ categories, tags, onFilterChange }) => {
    const handleCategoryChange = (event) => {
        onFilterChange(event.target.value, 'category');
    };

    const handleTagChange = (event) => {
        onFilterChange(event.target.value, 'tag');
    };

    return (
        <div className="filter-bar">
            <select onChange={handleCategoryChange}>
                <option value="">All Categories</option>
                {categories.map((category) => (
                    <option key={category} value={category}>
                        {category}
                    </option>
                ))}
            </select>
            <select onChange={handleTagChange}>
                <option value="">All Tags</option>
                {tags.map((tag) => (
                    <option key={tag} value={tag}>
                        {tag}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default FilterBar;