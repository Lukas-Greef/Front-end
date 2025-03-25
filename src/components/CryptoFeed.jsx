import React, { useState, useEffect } from "react";
import { connectWebSocket, disconnectWebSocket } from "../services/websocket.js"; // Zorg ervoor dat het pad klopt

const CryptoFeed = () => {
    const [cryptoData, setCryptoData] = useState(null);

    useEffect(() => {
        // Functie om de WebSocket te verbinden en berichten te ontvangen
        const onMessage = (data) => {
            console.log("Ontvangen data:", data);
            setCryptoData(data); // Stel de ontvangen data in de state in
        };

        connectWebSocket(onMessage); // Maak verbinding

        // Zorg ervoor dat de verbinding wordt gesloten bij het verlaten van de component
        return () => {
            disconnectWebSocket();
        };
    }, []);

    return (
        <div>
            <h2>Live Crypto Feed</h2>
            <p>{cryptoData ? `Huidige prijs: ${cryptoData.price}` : " Wachten op data..."}</p>
        </div>
    );
};

export default CryptoFeed;
