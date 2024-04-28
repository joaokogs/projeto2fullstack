// src/components/SearchBar.js
import React from 'react';

const SearchBar = ({ onSubmit, query, setQuery }) => {
    const handleChange = (event) => {
        const value = event.target.value;
        if (value === '' || (!isNaN(value) && parseInt(value) >= 1 && parseInt(value) <= 164)) {
            setQuery(value);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit(query);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={query}
                onChange={handleChange}
                placeholder="Digite um número de 1 a 164"
            />
            <button type="submit">Busque</button>
        </form>
    );
};

export default SearchBar;
