import React from 'react';
import { Box, Grid, Container } from '@mui/material';
import TotalCards from '../components/TotalCards';
import BarPieChart from '../components/BarPieChart';
import LineChart from '../components/LineChart';
import { useMediaQuery } from '@mui/material';
import { WebSocketProvider } from '../utils/WebSocketProvider';

const Dashboard = ({ isSidebarOpen }) => {
  console.log("is sidebar open",isSidebarOpen)
  return (

      <Box sx={{ display: 'flex', transition: 'margin 0.3s ease-in-out' }}>
        <Container
          sx={{
            flexGrow: 1,
            paddingTop: '15px',
            marginLeft: isSidebarOpen ? '20%': '12%', 
            transition: 'margin 0.3s ease-in-out',
            display: 'flex',
            flexDirection: 'column',
            alignItems: isSidebarOpen ? 'flex-start' : 'center',
            width: isSidebarOpen ? 'calc(100% - 20%)' : 'calc(100% - 12%)', 
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
