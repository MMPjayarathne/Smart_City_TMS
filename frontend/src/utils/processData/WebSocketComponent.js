import { useState, useEffect } from 'react';
import BusLineUpdatesWebSocketClient from '../webSocketClients/BusLineUpdatesWebSocketClient';
import RoadDisruptionsWebSocketClient from '../webSocketClients/RoadDisruptionsWebSocketClient';
import RoadDetailsWebSocketClient from '../webSocketClients/RoadDetailsWebSocketClient';

// Function to fetch Bus Line Data
const useBusLineData = () => {
    const [busLineData, setBusLineData] = useState(null);

    useEffect(() => {
        const busLineClient = new BusLineUpdatesWebSocketClient((data) => {
            console.log(data);
            setBusLineData(data);  
        });

        busLineClient.connect();

        return () => {
            busLineClient.disconnect();
        };
    }, []); 

    return busLineData;
};

// Function to fetch Road Disruptions Data
const useRoadDisruptionsData = () => {
    const [roadDisruptionsData, setRoadDisruptionsData] = useState(null);

    useEffect(() => {
        const roadDisruptionsClient = new RoadDisruptionsWebSocketClient((data) => {
          
            // const jsonData = JSON.parse(data);
            setRoadDisruptionsData(data); 
        
        });

        roadDisruptionsClient.connect();

        return () => {
            roadDisruptionsClient.disconnect();
        };
    }, []); 

    return roadDisruptionsData;
};

// Function to fetch Road Details Data
const useRoadDetailsData = () => {
    const [roadDetailsData, setRoadDetailsData] = useState(null);

    useEffect(() => {
        const roadDetailsClient = new RoadDetailsWebSocketClient((data) => {
            // const jsonData = JSON.parse(data);
            console.log(data);
            setRoadDetailsData(data);  
        });

        roadDetailsClient.connect();

        return () => {
            roadDetailsClient.disconnect();
        };
    }, []); 

    return roadDetailsData;
};

export { useBusLineData, useRoadDisruptionsData, useRoadDetailsData };
