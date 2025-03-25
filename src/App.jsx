import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CoinPage from "./pages/CoinPage";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import CoinList from "./components/CoinList";
import "./index.css";

function App() {
    return (
        <Router>
            <Header />
            <SearchBar />
            <Routes>
                <Route path="/" element={<CoinList />} />
                <Route path="/coin/:id" element={<CoinPage />} /> {/* Coin detailpagina */}
            </Routes>
        </Router>
    );
}

export default App;
