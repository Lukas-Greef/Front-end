import { useState } from "react";

function SearchBar({ onSearch }) {
    const [searchTerm, setSearchTerm] = useState("");

    // Update de zoekterm wanneer de gebruiker typt
    const handleChange = (event) => {
        setSearchTerm(event.target.value);
        onSearch(event.target.value);  // Roep de onSearch functie aan om de lijst te filteren
    };

    return (
        <div className="main">
            <input
                type="text"
                className="search-balk"
                placeholder="Zoek naar een coin..."
                value={searchTerm}
                onChange={handleChange}
            />
        </div>
    );
}

export default SearchBar;
