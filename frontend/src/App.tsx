import React from "react";
import KafkaWebSocket from "./components/KafkaWebSocket";
import Layout from "./components/main/Dashboard";
import "./index.css";
import "./src/styles/globals.css";

function App() {
    return (
    
        <Layout>
            <h1>Welcome to My App</h1>
            <p>This content is inside the layout.</p>
        </Layout>
        
    );
}

export default App;
