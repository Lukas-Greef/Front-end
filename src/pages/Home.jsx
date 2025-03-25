import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import CoinList from "../components/CoinList";
import MarketChart from "../components/MarketChart";
import Favorites from "../components/Favorites";

function Home() {
    return (
        <div>
            <Header />
            <SearchBar />
            <MarketChart />
            <Favorites />
        </div>
    );
}

export default Home;
