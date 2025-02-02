import React from 'react';
import Sidebar from '../components/Sidebar';
import LineChart from '../components/LineChart';
import { useTheme } from '@emotion/react';
import { Box, Grid, Container } from '@mui/material';
import TotalCards from '../components/TotalCards';
import BarPieChart from '../components/BarPieChart';
import DataTable from '../components/DataTable';


const Reports = ({ isSidebarOpen }) => {

  console.log("is sidebar open",isSidebarOpen)
  return (
    <Box sx={{ display: 'flex', transition: 'margin 0.3s ease-in-out' }}>
      <Container
        sx={{
          flexGrow: 1,
          paddingTop: '20px',
          marginLeft: isSidebarOpen ? '370px' : '300px', // Adjust margin based on sidebar state
          transition: 'margin 0.3s ease-in-out',
          display: 'flex',
          flexDirection: 'column',
          alignItems: isSidebarOpen ? 'flex-start' : 'center', // Align content to the left when sidebar is open
        }}
      >
        <Grid container spacing={3}>      
            <DataTable/>
        </Grid>

        <Grid container spacing={3}> 
        
        </Grid>
        <Grid container spacing={0}> 
         
        </Grid>
        
      </Container>
  </Box>
  );
};

export default Reports;
