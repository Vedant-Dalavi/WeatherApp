import React from 'react';

const SearchHistory = ({ searches, setInput }) => {
    return (
        <div className="search-history">
            <p><b>Recent Searches</b></p>
            <ul>
                {searches.map((search, index) => (
                    <li key={index} onClick={() => setInput(search)}>
                        {search}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SearchHistory;
