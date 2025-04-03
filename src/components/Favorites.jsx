import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Favorites() {
    const [favorites, setFavorites] = useState([]);
    const [coins, setCoins] = useState([]);

    useEffect(() => {
        // Haal de favorieten uit localStorage
        const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
        setFavorites(savedFavorites);

        // Haal alle coins op
        fetch("https://api.coincap.io/v2/assets")
            .then(response => response.json())
            .then(data => setCoins(data.data || []));
    }, []);

    // Filter de coins om alleen favorieten te tonen
    const favoriteCoins = coins.filter(coin => favorites.includes(coin.id));

    return (
        <div>
            <h2>Favoriete Coins</h2>
            {favoriteCoins.length > 0 ? (
                <div className="coins-container">
                    {favoriteCoins.map(coin => (
                        <div key={coin.id} className="card">
                            <Link to={`/coin/${coin.id}`} className="coin-link">
                                <h2 className="coin-name">{coin.name}</h2>
                                <div className="coin-price">Prijs: $ {parseFloat(coin.priceUsd).toFixed(2)}</div>
                            </Link>
                        </div>
                    ))}
                </div>
            ) : (
                <p>Je hebt nog geen favoriete coins toegevoegd.</p>
            )}
        </div>
    );
}

export default Favorites;
