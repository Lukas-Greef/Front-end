import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { useEffect, useState } from 'react';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#9C27B0', '#E91E63', '#4CAF50', '#FFC107', '#795548', '#2196F3'];

function MarketChart() {
    const [topCoins, setTopCoins] = useState([]);

    useEffect(() => {
        fetch("https://data-api.coindesk.com/asset/v1/top/list?page=1&page_size=10")
            .then(res => res.json())
            .then(data => {
                const coins = data?.Data?.LIST || [];
                const chartData = coins.map(coin => ({
                    name: coin.SYMBOL,
                    value: parseFloat(coin.TOTAL_MKT_CAP_USD)
                }));
                setTopCoins(chartData);
            });
    }, []);

    return (
        <div style={{ textAlign: 'center', padding: '30px' }}>
            <h2>Marktaandeel Top 10 Coins</h2>
            {topCoins.length > 0 ? (
                <PieChart width={770} height={520}>
                    <Pie
                        data={topCoins}
                        cx="50%"
                        cy="50%"
                        outerRadius={150}
                        fill="#8884d8"
                        dataKey="value"
                        label
                    >
                        {topCoins.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip
                        formatter={(value) =>
                            `$${Number(value).toLocaleString(undefined, {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                            })}`
                        }
                    />

                    <Legend />
                </PieChart>
            ) : (
                <p>Diagram wordt geladen...</p>
            )}
        </div>
    );
}

export default MarketChart;
