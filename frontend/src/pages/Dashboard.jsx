import React from 'react';
import Sidebar from '../components/Sidebar';
import LineChart from '../components/LineChart';
import { useTheme } from '@emotion/react';
import { Box, Grid, Container } from '@mui/material';
import TotalCards from '../components/TotalCards';
import BarPieChart from '../components/BarPieChart';


const Dashboard = () => {
  const theme = useTheme()

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Container sx={{ flexGrow: 1, paddingTop: '20px' }}>
        <Grid container spacing={3}>      
          <TotalCards /> 
        </Grid>

        <Grid container spacing={3}> 
          < LineChart />
        </Grid>
        <Grid container spacing={0}> 
          < BarPieChart />
        </Grid>
        
      </Container>
  </Box>
  );
};

export default Dashboard;
