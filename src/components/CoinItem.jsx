import "../index.css";
import PropTypes from "prop-types";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

function CoinItem({ coin }) {
    const data = coin.history.map((price, index) => ({
        time: index, // Tijdstippen (je kan dit aanpassen)
        price: price, // Prijs van de coin
    }));

    return (
        <li className="coin-item">
            <div className="coin-info">
                <span>{coin.name} - {coin.price}</span>
                <span>{coin.change}</span>
            </div>
            <div className="coin-chart">
                <ResponsiveContainer width={150} height={50}>
                    <LineChart data={data}>
                        <XAxis dataKey="time" hide />
                        <YAxis hide />
                        <Tooltip />
                        <Line type="monotone" dataKey="price" stroke="#8884d8" strokeWidth={2} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </li>
    );
}

// ✅ Voeg PropTypes toe
CoinItem.propTypes = {
    coin: PropTypes.shape({
        name: PropTypes.string.isRequired,
        price: PropTypes.string.isRequired,
        change: PropTypes.string.isRequired,
        history: PropTypes.arrayOf(PropTypes.number).isRequired,
    }).isRequired,
};

export default CoinItem;
