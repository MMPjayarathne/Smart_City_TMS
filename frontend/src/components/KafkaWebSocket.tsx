import React, { useEffect, useState } from "react";

const KafkaWebSocket: React.FC = () => {
    const [messages, setMessages] = useState<string[]>([]);

    useEffect(() => {
        const socket: WebSocket = new WebSocket("ws://localhost:5291/ws/live-updates");

        socket.onopen = () => console.log("✅ WebSocket Connected");

        socket.onmessage = (event: MessageEvent<string>) => {
            console.log("📩 Message Received:", event.data);
            setMessages((prev) => [...prev, event.data]);
        };

        socket.onerror = (event: Event) => console.error("❌ WebSocket Error:", event);

        socket.onclose = (event: CloseEvent) => console.log("🔴 WebSocket Disconnected", event.code, event.reason);

        return () => {
            console.log("🔌 Closing WebSocket connection...");
            socket.close();
        };
    }, []);

    return (
        <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
            <h2>Live Kafka Messages</h2>
            <ul style={{ listStyleType: "none", padding: 0 }}>
                {messages.map((msg, index) => (
                    <li key={index} style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
                        {msg}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default KafkaWebSocket;
