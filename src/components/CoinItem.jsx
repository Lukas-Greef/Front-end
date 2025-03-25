function CoinItem({ coin }) {
    return (
        <li>
            <span>{coin.name} - {coin.price}</span>
            <span>{coin.change}</span>
        </li>
    );
}

export default CoinItem;
