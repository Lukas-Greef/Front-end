import { BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import Home from "./pages/Home";
import CoinPage from "./pages/CoinPage";
import Header from "./components/Header";
import CoinList from "./components/CoinList";
import "./index.css";
import Favorites from "./components/Favorites.jsx";


function App() {
    return (
        <Router>
            <Header/>
            <button>
                <Link to="/favorites">Favorieten</Link>
            </button>
            <Routes>
                <Route path="/" element={<CoinList/>}/>
                <Route path="/coin/:id" element={<CoinPage/>}/> {/* Coin detailpagina */}
                <Route path="/favorites" element={<Favorites />} />
            </Routes>
        </Router>
    );
}

export default App;
