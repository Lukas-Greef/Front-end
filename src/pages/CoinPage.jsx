import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "../index.css";
import MarketChart from "../components/MarketChart.jsx";

function CoinPage() {
    const { id } = useParams();
    const [coin, setCoin] = useState(null);

    useEffect(() => {
        fetch("https://data-api.coindesk.com/asset/v1/top/list?page=1&page_size=100")
            .then(res => res.json())
            .then(data => {
                const found = data?.Data?.LIST?.find(c => c.ID === parseInt(id));
                setCoin(found);
            });
    }, [id]);

    if (!coin) {
        return (
            <div className="loading-screen">
                <p>Laden...</p>
            </div>
        );
    }

    return (
        <div className="coin-container">
            <div className="coin-card">
                <Link to="/" className="back-link">&larr; Terug naar Home</Link>

                <div className="coin-header">
                    <img src={coin.LOGO_URL} alt={coin.SYMBOL} className="coin-logo" />
                    <h1>{coin.NAME}</h1>
                </div>

                <div className="coin-info">
                    <div><strong>Prijs:</strong> ${parseFloat(coin.PRICE_USD).toFixed(2)}</div>
                    <div><strong>Marktkapitalisatie:</strong> ${parseFloat(coin.TOTAL_MKT_CAP_USD).toFixed(2)}</div>
                    <div><strong>Totale Supply:</strong> {parseFloat(coin.SUPPLY_TOTAL).toFixed(2)}</div>
                    <div><strong>24u Verandering:</strong> {parseFloat(coin.SPOT_MOVING_24_HOUR_CHANGE_PERCENTAGE_USD).toFixed(2)}%</div>
                </div>
            </div>
            <MarketChart/>
        </div>

    );
}

export default CoinPage;
