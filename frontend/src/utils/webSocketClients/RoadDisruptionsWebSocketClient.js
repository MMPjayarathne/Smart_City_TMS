import WebSocketClient from '../WebSocketClient';

class RoadDisruptionsWebSocketClient {
    constructor(onUpdateCallback) {
        const backendUrl = process.env.REACT_APP_WEB_SOCKET_BACKEND_URL;
        this.wsClient = new WebSocketClient(`${backendUrl}/ws/live-road-distruptions`, onUpdateCallback);
    }

    connect() {
        this.wsClient.connect();
    }

    sendMessage(message) {
        this.wsClient.sendMessage(message);
    }

    disconnect() {
        this.wsClient.disconnect();
    }
}

export default RoadDisruptionsWebSocketClient;
