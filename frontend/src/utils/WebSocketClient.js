class WebSocketClient {
    constructor(url, onMessageCallback) {
        this.url = url;
        this.onMessageCallback = onMessageCallback;
        this.socket = null;
        this.isConnected = false; // Track the connection state
    }

    connect() {
        if (this.isConnected) {
            console.log(`Already connected to ${this.url}`);
            return; // Don't reconnect if already connected
        }

        this.socket = new WebSocket(this.url);

        this.socket.onopen = () => {
            console.log(`Connected to ${this.url}`);
            this.isConnected = true; // Mark as connected
        };

        this.socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            this.onMessageCallback(data);
        };

        this.socket.onclose = () => {
            console.log(`Disconnected from ${this.url}`);
            this.isConnected = false; // Mark as disconnected
        };

        this.socket.onerror = (error) => {
            console.error(`WebSocket error: `, error); // Log the entire error object
        };
    }

    sendMessage(message) {
        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(JSON.stringify(message));
        } else {
            console.error("WebSocket not open. Can't send message.");
        }
    }

    disconnect() {
        if (this.socket && this.isConnected) {
            this.socket.close();
        } else {
            console.log("WebSocket not connected.");
        }
    }
}

export default WebSocketClient;
