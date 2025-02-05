import React, { createContext, useContext, useEffect, useState } from "react";
import { useBusLineData, useRoadDetailsData, useRoadDisruptionsData } from "./processData/WebSocketComponent";

export const WebSocketContext = createContext(null);

export const WebSocketProvider = ({ children }) => {
    const busLineData = useBusLineData();
    const roadDisruptionsData = useRoadDisruptionsData();
    const roadDetailsData = useRoadDetailsData();
  
    return (
        <WebSocketContext.Provider value={{ busLineData, roadDisruptionsData, roadDetailsData }}>
            {children}
        </WebSocketContext.Provider>
    );
};

