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
        fetch("data-api.coindesk.com/asset/v1/top/list?page=1&page_size=100")
            .then(httpResponse => httpResponse.json())
            .then(jsonResponse => {
                setCoins(jsonResponse.Data.LIST);
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
            <button>
                <Link to="/favorites">Favorieten</Link>
            </button>
            <h1>Coins Overview</h1>
            <SearchBar setSearchTerm={setSearchTerm}/> {/* Geef functie door */}
            <div className="coins-container">
                {filteredCoins.map(coin => (
                    <div key={coin.URI} className="card">
                        <Link to={`/coin/${coin.URI}`} className="coin-link">
                            <h2 className="coin-name">{coin.Name}</h2>
                            <div className="coin-price">Prijs: $ {parseFloat(coin.priceUsd).toFixed(2)}</div>
                        </Link>
                        <button
                            className={`favorite-btn ${favorites.includes(coin.URI) ? "active" : ""}`}
                            onClick={() => toggleFavorite(coin.URI)}
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
