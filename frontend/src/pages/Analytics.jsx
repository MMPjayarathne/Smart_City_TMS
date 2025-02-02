import React from 'react';
import Sidebar from '../components/Sidebar';
import LineChart from '../components/LineChart';
import { useTheme } from '@emotion/react';
import { Box, Grid, Container } from '@mui/material';
import TotalCards from '../components/TotalCards';
import BarPieChart from '../components/BarPieChart';


const Analytics = ({ isSidebarOpen }) => {

  console.log("is sidebar open",isSidebarOpen)
  return (
    <Box sx={{ display: 'flex', transition: 'margin 0.3s ease-in-out' }}>
      <Container
        sx={{
          flexGrow: 1,
          paddingTop: '20px',
          marginLeft: isSidebarOpen ? '350px' : '300px', 
          transition: 'margin 0.3s ease-in-out',
          display: 'flex',
          flexDirection: 'column',
          alignItems: isSidebarOpen ? 'flex-start' : 'center', 
        }}
      >
        <Grid container spacing={3}>      
            <TotalCards/>
        </Grid>

        <Grid container spacing={3}> 
        
        </Grid>
        <Grid container spacing={0}> 
         
        </Grid>
        
      </Container>
  </Box>
  );
};

export default Analytics;
