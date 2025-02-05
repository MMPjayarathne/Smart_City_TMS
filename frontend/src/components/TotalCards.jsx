import React, { useContext, useEffect, useState } from 'react';
import { Box, Grid, Card, CardContent, Typography, useTheme } from '@mui/material';
import { DirectionsBus, Warning, Route, Timelapse } from '@mui/icons-material'; // Example icons for the cards

import { WebSocketContext } from '../utils/WebSocketProvider';


const TotalCards = () => {
  const theme = useTheme();
  const { busLineData, roadDisruptionsData, roadDetailsData } = useContext(WebSocketContext);

  const [totalBusLines, setTotalBusLines] = useState(0);
  const [totalRoadDisruptions, setTotalRoadDisruptions] = useState(0);
  const [totalRoadDetails, setTotalRoadDetails] = useState(0);
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    setTotalBusLines(busLineData ? busLineData.length : 0);
    setTotalRoadDisruptions(roadDisruptionsData ? roadDisruptionsData.length : 0);
    setTotalRoadDetails(roadDetailsData ? roadDetailsData.length : 0);

    const intervalId = setInterval(() => {
      const currentTime = new Date().toLocaleTimeString(); 
      setCurrentTime(currentTime);
    }, 1000);
    return () => clearInterval(intervalId);

  }, [busLineData, roadDisruptionsData, roadDetailsData]);

  // Example data for the total numbers
  const data = [
    { label: 'Time', value: currentTime, icon: <Timelapse /> },
    { label: 'Total Bus Lines', value:totalBusLines, icon: <DirectionsBus /> },
    { label: 'Total Roads', value: totalRoadDetails, icon: <Route /> },
    { label: 'Total Disruptions', value: totalRoadDisruptions, icon: <Warning /> },
    
  ];

  return (
    <Grid container spacing={0}>
          <Grid item xs={12}>
            <Box sx={{ width: '100%', paddingTop: 2, paddingBottom:2 }}>
            <Grid container spacing={2} justifyContent="center">
                {data.map((item, index) => (
                <Grid item xs={12} sm={3} key={index}>
                    <Card sx={{ height: '100%', backgroundColor: theme.palette.background.paper, boxShadow: 3 }}>
                      <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          
                          {/* Enlarged Icon Aligned to Left */}
                          <Box sx={{ 
                            fontSize: { xs: 30, sm: 40, md: 50, lg: 60 }, 
                            color: theme.palette.primary.main, 
                            display: 'flex', 
                            alignItems: 'center' 
                          }}>
                            {React.cloneElement(item.icon, { fontSize: 'inherit' })}
                          </Box>

                          {/* Text Content */}
                          <Box sx={{ textAlign: 'center', flexGrow: 1 }}>
                            <Typography 
                              sx={{ 
                                color: theme.palette.text.primary,
                                fontSize: { xs: '0.5rem', sm: '0.6rem', md: '0.8rem', lg: '1.0rem' }
                              }}
                            >
                              {item.label}
                            </Typography>
                            <Typography 
                              sx={{ 
                                color: theme.palette.text.primary, 
                                fontWeight: 'bold',
                                fontSize: { xs: '0.8rem', sm: '1.0rem', md: '1.2rem', lg: '1.5rem' }
                              }}
                            >
                              {item.value}
                            </Typography>
                          </Box>

                        </Box>
                      </CardContent>
                    </Card>
                </Grid>
                ))}
            </Grid>
            </Box> 
        </Grid>
          {/* Other content like charts can go here */}
    </Grid>

  );
};

export default TotalCards;
