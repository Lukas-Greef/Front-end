import { useState } from "react";
import PropTypes from "prop-types";

function SearchBar({ setSearchTerm }) {
    const [input, setInput] = useState("");

    const handleChange = (event) => {
        setInput(event.target.value);
        setSearchTerm(event.target.value); // Stuur waarde naar CoinList
    };

    return (
        <input
            type="text"
            placeholder="Zoek een coin..."
            value={input}
            onChange={handleChange}
            className="search-bar"
        />
    );
}
SearchBar.propTypes = {
    setSearchTerm: PropTypes.func.isRequired,
};
export default SearchBar;
