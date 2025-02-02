import React from 'react';
import { Box, Grid, Container } from '@mui/material';
import TotalCards from '../components/TotalCards';
import BarPieChart from '../components/BarPieChart';
import LineChart from '../components/LineChart';

const Dashboard = ({ isSidebarOpen }) => {

  console.log("is sidebar open",isSidebarOpen)
  return (
    <Box sx={{ display: 'flex', transition: 'margin 0.3s ease-in-out' }}>
      <Container
        sx={{
          flexGrow: 1,
          paddingTop: '20px',
          marginLeft: isSidebarOpen ? '350px' : '300px', // Adjust margin based on sidebar state
          transition: 'margin 0.3s ease-in-out',
          display: 'flex',
          flexDirection: 'column',
          alignItems: isSidebarOpen ? 'flex-start' : 'center', // Align content to the left when sidebar is open
        }}
      >
        {/* Total Cards */}
        <Grid container spacing={3} justifyContent={isSidebarOpen ? 'flex-start' : 'center'}>
          <TotalCards />
        </Grid>

        {/* Bar & Pie Chart */}
        <Grid container spacing={3} justifyContent={isSidebarOpen ? 'flex-start' : 'center'}>
          <BarPieChart />
        </Grid>

        {/* Line Chart */}
        <Grid container spacing={3} justifyContent={isSidebarOpen ? 'flex-start' : 'center'}>
          <LineChart />
        </Grid>
      </Container>
    </Box>
  );
};

export default Dashboard;
