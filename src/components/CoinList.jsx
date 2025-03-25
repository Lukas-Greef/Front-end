import "../index.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import Link

function CoinList() {
    const [coins, setCoins] = useState([]);

    useEffect(() => {
        fetch("https://api.coincap.io/v2/assets")
            .then(httpResponse => httpResponse.json())
            .then(jsonResponse => {
                setCoins(jsonResponse.data);
            });
    }, []);

    return (
        <div className="main">
            <h1>Coins Overview</h1>
            <div className="coins-container">
                {coins.map(coin => (
                    <Link to={`/coin/${coin.id}`} key={coin.id} className="card"> {/* Maak klikbaar */}
                        <h2 className="coin-name">{coin.name}</h2>
                        <div className="coin-price">Prijs: $ {parseFloat(coin.priceUsd).toFixed(2)}</div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
export default CoinList;
