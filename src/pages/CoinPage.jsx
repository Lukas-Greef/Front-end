import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../index.css";

function CoinPage() {
    const { id } = useParams(); // Haal de coin ID uit de URL
    const [coin, setCoin] = useState(null);

    useEffect(() => {
        fetch(`https://api.coincap.io/v2/assets/${id}`)
            .then(httpResponse => httpResponse.json())
            .then(jsonResponse => {
                setCoin(jsonResponse.data);
            });
    }, [id]);

    if (!coin) {
        return <div>Loading...</div>;
    }

    return (
        <div className="main">
        <div className="coin-detail">
            <h1>{coin.name} ({coin.symbol})</h1>
            <p>Prijs: ${parseFloat(coin.priceUsd).toFixed(2)}</p>
            <p>Marktkapitalisatie: ${parseFloat(coin.marketCapUsd).toFixed(2)}</p>
            <p>24h Verandering: {parseFloat(coin.changePercent24Hr).toFixed(2)}%</p>
        </div>
        </div>
    );
}

export default CoinPage;
