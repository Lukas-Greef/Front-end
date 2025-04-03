import "../index.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar.jsx"; // Import Link

function CoinList() {
    const [coins, setCoins] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [favorites, setFavorites] = useState(() => {
        return JSON.parse(localStorage.getItem("favorites")) || [];
    });

    useEffect(() => {
        fetch("https://api.coincap.io/v2/assets")
            .then(httpResponse => httpResponse.json())
            .then(jsonResponse => {
                setCoins(jsonResponse.data);
            });
    }, []);

    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites]);
    const toggleFavorite = (coinId) => {
        setFavorites((prevFavorites) =>
            prevFavorites.includes(coinId)
                ? prevFavorites.filter((id) => id !== coinId)
                : [...prevFavorites, coinId]
        );
    };

    const filteredCoins = [...coins].sort((a, b) => {
        const aMatch = a.name.toLowerCase().includes(searchTerm.toLowerCase());
        const bMatch = b.name.toLowerCase().includes(searchTerm.toLowerCase());
        return bMatch - aMatch; // Prioriteer de matchende coin
    });

    return (
        <div className="main">
            <h1>Coins Overview</h1>
            <SearchBar setSearchTerm={setSearchTerm} /> {/* Geef functie door */}
            <div className="coins-container">
                {filteredCoins.map(coin => (
                    <div key={coin.id} className="card">
                        <Link to={`/coin/${coin.id}`} className="coin-link">
                            <h2 className="coin-name">{coin.name}</h2>
                            <div className="coin-price">Prijs: $ {parseFloat(coin.priceUsd).toFixed(2)}</div>
                        </Link>
                        <button
                            className={`favorite-btn ${favorites.includes(coin.id) ? "active" : ""}`}
                            onClick={() => toggleFavorite(coin.id)}
                        >
                            ★
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default CoinList;
