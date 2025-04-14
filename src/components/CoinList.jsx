import "../index.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar.jsx";

function CoinList() {
    const [coins, setCoins] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [favorites, setFavorites] = useState(() => {
        return JSON.parse(localStorage.getItem("favorites")) || [];
    });

    useEffect(() => {
        fetch("https://data-api.coindesk.com/asset/v1/top/list?page=1&page_size=100")
            .then(httpResponse => httpResponse.json())
            .then(jsonResponse => {
                console.log("API response:", jsonResponse);
                setCoins(jsonResponse.Data?.LIST || []);
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

    const filteredCoins = coins.filter(coin =>
        coin.NAME.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="main">
            <button>
                <Link to="/favorites">Favorieten</Link>
            </button>
            <h1>Coins Overview</h1>
            <SearchBar setSearchTerm={setSearchTerm} />
            <div className="coins-container">
                {filteredCoins.map(coin => (
                    <div key={coin.ID} className="card">
                        <Link to={`/coin/${coin.ID}`} className="coin-link">
                            <img src={coin.LOGO_URL} alt={coin.SYMBOL} width="50" />
                            <h2 className="coin-name">{coin.NAME} ({coin.SYMBOL})</h2>
                            <p>Prijs: ${parseFloat(coin.PRICE_USD).toFixed(2)}</p> {/* Geen prijs in deze API! */}
                        </Link>
                        <button
                            className={`favorite-btn ${favorites.includes(coin.ID) ? "active" : ""}`}
                            onClick={() => toggleFavorite(coin.ID)}
                        >
                            ★
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CoinList;
