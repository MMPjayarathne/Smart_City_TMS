import WebSocketClient from '../WebSocketClient';

class BusLineUpdatesWebSocketClient {




    constructor(onUpdateCallback) {
        const backendUrl = process.env.REACT_APP_WEB_SOCKET_BACKEND_URL; 
        this.wsClient = new WebSocketClient(`${backendUrl}/ws/live-busline-updates`, onUpdateCallback);
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

export default BusLineUpdatesWebSocketClient;
