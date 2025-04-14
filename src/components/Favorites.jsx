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
        fetch("https://data-api.coindesk.com/asset/v1/top/list?page=1&page_size=100")
            .then(response => response.json())
            .then(data => setCoins(data.Data.LIST || []));
    }, []);

    // Filter de coins om alleen favorieten te tonen
    const favoriteCoins = coins.filter(coin => favorites.includes(coin.ID));

    return (
        <div>
            <h2>Favoriete Coins</h2>
            {favoriteCoins.length > 0 ? (
                <div className="coins-container">
                    {favoriteCoins.map(coin => (
                        <div key={coin.ID} className="card">
                            <Link to={`/coin/${coin.ID}`} className="coin-link">
                                <h2 className="coin-name">{coin.NAME}</h2>
                                <div className="coin-price">Prijs: $ {parseFloat(coin.PRICE_USD).toFixed(2)}</div>
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
