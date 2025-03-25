const SOCKET_URL = "wss://ws-feed.pro.coinbase.com";

let socket = null;

export const connectWebSocket = (onMessage) => {
    if (socket) return; // Voorkom dubbele verbindingen

    socket = new WebSocket(SOCKET_URL);

    socket.onopen = () => {
        console.log("WebSocket verbonden");
        const subscribeMessage = JSON.stringify({
            type: "subscribe",
            channels: [{ name: "ticker", product_ids: ["BTC-USD"] }],
        });
        socket.send(subscribeMessage);
    };

    socket.onmessage = (event) => {
        onMessage(JSON.parse(event.data));
    };

    socket.onclose = () => {
        console.log("WebSocket gesloten");
        socket = null;
    };

    socket.onerror = (error) => {
        console.error("WebSocket error:", error);
    };
};

export const disconnectWebSocket = () => {
    if (socket) {
        socket.close();
        socket = null;
    }
};
